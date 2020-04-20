import { Depths } from '../constants/depths';
import { Dungeon } from './dungeon';
import { DungeonTile } from './dungeon-tile';
import { DungeonMarker } from './dungeon-marker';
import { DungeonTileFactory } from './dungeon-tile-factory';

export type DungeonLayers = {
  /*
  wallsUp: Phaser.Tilemaps.StaticTilemapLayer;
  wallsDown: Phaser.Tilemaps.DynamicTilemapLayer;
  wallsLeft: Phaser.Tilemaps.StaticTilemapLayer;
  wallsRight: Phaser.Tilemaps.StaticTilemapLayer;
  floor: Phaser.Tilemaps.StaticTilemapLayer;
  */
  map: Phaser.Tilemaps.DynamicTilemapLayer;
};

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

    const dungeonLayers = this.createLayers(tilemap, x, y);
    const dungeonTiles = this.createDungeonTiles(tilemap, dungeonLayers);
    const dungeonMarkers = this.createDungeonMarkers(tilemap, dungeonLayers, x, y);

    const dungeon = new Dungeon(dungeonTiles, dungeonMarkers, dungeonLayers);

    dungeonTiles.forEach(dungeonTile => this.dungeonTileFactory.process(dungeonTile, dungeon));

    return dungeon;
  }

  private createLayers(tilemap: Phaser.Tilemaps.Tilemap, x: number, y: number): DungeonLayers {
    /*
    const layers: DungeonLayers = {
      wallsUp: tilemap.createStaticLayer('wallsUp', 'dungeon-tileset', x, y),
      wallsDown: tilemap.createDynamicLayer('wallsDown', 'dungeon-tileset', x, y),
      wallsLeft: tilemap.createStaticLayer('wallsLeft', 'dungeon-tileset', x, y),
      wallsRight: tilemap.createStaticLayer('wallsRight', 'dungeon-tileset', x, y),
      floor: tilemap.createStaticLayer('floor', 'dungeon-tileset', x, y)
    }
    */

    /*
    layers.wallsUp.setDepth(Depths.wallsUp);
    layers.wallsDown.setDepth(Depths.wallsDown);
    layers.wallsLeft.setDepth(Depths.wallsLeft);
    layers.wallsRight.setDepth(Depths.wallsRight);
    layers.floor.setDepth(Depths.floor);
    */

    // return layers;

    return {
      map: tilemap.createDynamicLayer('map', 'dungeon-tileset', x, y)
    };
  }

  private createDungeonTiles(tilemap: Phaser.Tilemaps.Tilemap, layers: DungeonLayers): DungeonTile[] {
    const tileData: Record<string, Record<string, any[]>> = {};

    Object.values(layers).forEach((layer: Phaser.Tilemaps.StaticTilemapLayer | Phaser.Tilemaps.DynamicTilemapLayer) => {
      layer.forEachTile(function(tile: Phaser.Tilemaps.Tile) {
        const coordinate = `${tile.x},${tile.y}`;
        // tileData[coordinate] = Object.assign({}, tile.properties, tileData[coordinate] ?? {})
        tileData[coordinate] = tileData[coordinate] ?? {};
        Object.entries(tile.properties).forEach(([key, value]) => {
          tileData[coordinate][key] = tileData[coordinate][key] ?? [];
          tileData[coordinate][key].push(value);
        });
      }, this, 0, 0, tilemap.width, tilemap.height, {
        isNotEmpty: true
      });
    });

    return Object.entries(tileData).map(([coordinate, properties]) => {
      const [gridX, gridY] = coordinate.split(',').map(Number);
      // const worldCoordinates = layers.floor.tileToWorldXY(gridX, gridY);
      const worldCoordinates = layers.map.tileToWorldXY(gridX, gridY);

      return this.dungeonTileFactory.create(gridX, gridY, worldCoordinates.x, worldCoordinates.y, properties)
    });
  }

  private createDungeonMarkers(tilemap: Phaser.Tilemaps.Tilemap, layers: DungeonLayers, x: number, y: number): Record<string, DungeonMarker> {
    const markers = tilemap.getObjectLayer('markers').objects;
    const dungeonMarkers: Record<string, DungeonMarker> = markers.reduce((acc, marker) => {
      // const gridCoordinates = layers.floor.getTileAtWorldXY(marker.x! + x, marker.y! + y);
      // const worldCoordinates = layers.floor.tileToWorldXY(gridCoordinates.x, gridCoordinates.y);
      const gridCoordinates = layers.map.getTileAtWorldXY(marker.x! + x, marker.y! + y);
      const worldCoordinates = layers.map.tileToWorldXY(gridCoordinates.x, gridCoordinates.y);

      acc[marker.name] = new DungeonMarker(marker.name, gridCoordinates.x, gridCoordinates.y, worldCoordinates.x, worldCoordinates.y);

      return acc;
    }, {} as Record<string, DungeonMarker>);

    return dungeonMarkers;
  }
}
