import { Dungeon } from './dungeon';
import { DungeonTile } from './dungeon-tile';
import { DungeonMarker } from './dungeon-marker';
import { DungeonTileFactory, OBJECTS_KEY } from './dungeon-tile-factory';
import { DungeonScene } from '../scenes/dungeon-scene';

export class DungeonFactory {
  private dungeonTileFactory: DungeonTileFactory;

  constructor(
    private scene: DungeonScene,
  ) {
    this.dungeonTileFactory = new DungeonTileFactory(scene);
  }

  public createDungeon(levelKey: string, x: number, y: number): Dungeon {
    const tilemap = this.scene.add.tilemap(levelKey);
    tilemap.addTilesetImage('dungeon-tileset', 'dungeon-spritesheet');

    const dungeonFloor = this.createFloor(tilemap, x, y);
    tilemap.setLayer('floor');

    const dungeonTiles = this.createDungeonTiles(tilemap, dungeonFloor);
    const dungeonMarkers = this.createDungeonMarkers(tilemap, x, y);

    const dungeon = new Dungeon(dungeonTiles, dungeonMarkers, dungeonFloor, tilemap);

    dungeonTiles.forEach(dungeonTile => this.dungeonTileFactory.addBehaviors(dungeonTile, dungeon));

    return dungeon;
  }

  private createFloor(tilemap: Phaser.Tilemaps.Tilemap, x: number, y: number): Phaser.Tilemaps.DynamicTilemapLayer {
    return tilemap.createDynamicLayer('floor', 'dungeon-tileset', x, y);
  }

  private createDungeonTiles(tilemap: Phaser.Tilemaps.Tilemap, floor: Phaser.Tilemaps.DynamicTilemapLayer): DungeonTile[] {
    const tileData = new TileData();

    // gather floor tile data
    floor.forEachTile(function(tile: Phaser.Tilemaps.Tile) {
      Object.entries(tile.properties).forEach(([key, value]) => {
        tileData.addKeyValue(tile.x, tile.y, key, value);
      });
    }, this, 0, 0, tilemap.width, tilemap.height, {
      isNotEmpty: true
    });

    // gather object tile data
    const objects = tilemap.getLayer('objects');
    objects.data.flat()
      .filter(tile => tile.index !== -1)
      .forEach(tile => {
        tileData.addKeyValue(tile.x, tile.y, OBJECTS_KEY, tile.index);

        Object.entries(tile.properties).forEach(([key, value]) => {
          tileData.addKeyValue(tile.x, tile.y, key, value);
        });
      });

    // create tiles
    const dungeonTiles: DungeonTile[] = [];
    tileData.forEach((coordinates, properties) => {
      const worldCoordinates = tilemap.tileToWorldXY(coordinates.x, coordinates.y);

      const dungeonTile = this.dungeonTileFactory.create(coordinates.x, coordinates.y, worldCoordinates.x, worldCoordinates.y, properties)
      dungeonTiles.push(dungeonTile);
    });

    return dungeonTiles;
  }

  private createDungeonMarkers(tilemap: Phaser.Tilemaps.Tilemap, x: number, y: number): Record<string, DungeonMarker> {
    const markers = tilemap.getObjectLayer('markers').objects;
    const dungeonMarkers: Record<string, DungeonMarker> = markers.reduce((acc, marker) => {
      const gridCoordinates = tilemap.getTileAtWorldXY(marker.x! + x, marker.y! + y);
      const worldCoordinates = tilemap.tileToWorldXY(gridCoordinates.x, gridCoordinates.y);

      acc[marker.name] = new DungeonMarker(marker.name, gridCoordinates.x, gridCoordinates.y, worldCoordinates.x, worldCoordinates.y);

      return acc;
    }, {} as Record<string, DungeonMarker>);

    return dungeonMarkers;
  }
}

type TileDataForEachCallback = (coordinates: { x: number; y: number }, data: Record<string, any>) => void;
class TileData {
  private tileData: Record<string, Record<string, any[]>>;

  constructor() {
    this.tileData = {};
  }

  addKeyValue(x: number, y: number, key: string, value: any) {
    const tileKey = this.coordinatesToTileKey(x, y);
    this.tileData[tileKey] = this.tileData[tileKey] ?? {}

    this.tileData[tileKey][key] = this.tileData[tileKey][key] ?? [];
    this.tileData[tileKey][key].push(value);
  }

  forEach(fn: TileDataForEachCallback) {
    Object.entries(this.tileData).forEach(([tileKey, data]) => {
      const coordinates = this.tileKeyToCoordinates(tileKey);

      fn(coordinates, data);
    });
  }

  private coordinatesToTileKey(x: number, y: number) {
    return `${x},${y}`;
  }

  private tileKeyToCoordinates(tileKey: string) {
    const [x, y] = tileKey.split(',').map(Number);

    return { x, y };
  }
}
