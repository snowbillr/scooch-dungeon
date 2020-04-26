import { Dungeon } from './dungeon';
import { DungeonTile } from './dungeon-tile';
import { DungeonMarker } from './dungeon-marker';
import { DungeonTileFactory } from './dungeon-tile-factory';

export class DungeonFactory {
  private dungeonTileFactory: DungeonTileFactory;

  constructor(
    private scene: Phaser.Scene,
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

    dungeonTiles.forEach(dungeonTile => this.dungeonTileFactory.process(dungeonTile, dungeon));

    return dungeon;
  }

  private createFloor(tilemap: Phaser.Tilemaps.Tilemap, x: number, y: number): Phaser.Tilemaps.DynamicTilemapLayer {
    return tilemap.createDynamicLayer('floor', 'dungeon-tileset', x, y);
  }

  private createDungeonTiles(tilemap: Phaser.Tilemaps.Tilemap, floor: Phaser.Tilemaps.DynamicTilemapLayer): DungeonTile[] {
    const tileData: Record<string, Record<string, any[]>> = {};

    floor.forEachTile(function(tile: Phaser.Tilemaps.Tile) {
      const coordinate = `${tile.x},${tile.y}`;
      tileData[coordinate] = tileData[coordinate] ?? {};
      Object.entries(tile.properties).forEach(([key, value]) => {
        tileData[coordinate][key] = tileData[coordinate][key] ?? [];
        tileData[coordinate][key].push(value);
      });
    }, this, 0, 0, tilemap.width, tilemap.height, {
      isNotEmpty: true
    });

    const objects = tilemap.getLayer('objects');
    objects.data.flat()
      .filter(tile => tile.index !== -1)
      .forEach(tile => {
        const worldCoordinates = tilemap.tileToWorldXY(tile.x, tile.y);
        if (tile.index === 85) {
          this.scene.add.sprite(worldCoordinates.x, worldCoordinates.y, 'objective', 0)
            .setOrigin(0);
        } else if (tile.index === 50) {
          this.scene.add.image(worldCoordinates.x, worldCoordinates.y, 'rock')
            .setOrigin(0);
        }

        const coordinate = `${tile.x},${tile.y}`;
        tileData[coordinate] = tileData[coordinate] ?? {};
        Object.entries(tile.properties).forEach(([key, value]) => {
          tileData[coordinate][key] = tileData[coordinate][key] ?? [];
          tileData[coordinate][key].push(value);
        });
      });

    return Object.entries(tileData).map(([coordinate, properties]) => {
      const [gridX, gridY] = coordinate.split(',').map(Number);
      const worldCoordinates = tilemap.tileToWorldXY(gridX, gridY);

      return this.dungeonTileFactory.create(gridX, gridY, worldCoordinates.x, worldCoordinates.y, properties)
    });
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
