import { Depths } from '../constants/depths';
import { Dungeon } from './dungeon';
import { DungeonTile } from './dungeon-tile';
import { DungeonMarker } from './dungeon-marker';

export type DungeonLayers = {
  wallsBelow: Phaser.Tilemaps.StaticTilemapLayer;
  wallsAbove: Phaser.Tilemaps.DynamicTilemapLayer;
  floor: Phaser.Tilemaps.StaticTilemapLayer;
};

export class DungeonFactory {
  constructor(
    private scene: Phaser.Scene,
  ) {}

  public createDungeon(levelKey: string, x: number, y: number): Dungeon {
    const tilemap = this.scene.add.tilemap(levelKey);
    tilemap.addTilesetImage('dungeon-tileset', 'dungeon-spritesheet');

    const dungeonLayers = this.createLayers(tilemap, x, y);
    const dungeonTiles = this.createDungeonTiles(tilemap, dungeonLayers);
    const dungeonMarkers = this.createDungeonMarkers(tilemap, dungeonLayers, x, y);

    return new Dungeon(dungeonTiles, dungeonMarkers, dungeonLayers);
  }

  private createLayers(tilemap: Phaser.Tilemaps.Tilemap, x: number, y: number): DungeonLayers {
    const layers: DungeonLayers = {
      wallsBelow: tilemap.createStaticLayer('wallsBelow', 'dungeon-tileset', x, y),
      // wallsAbove: tilemap.createStaticLayer('wallsAbove', 'dungeon-tileset', x, y),
      wallsAbove: tilemap.createDynamicLayer('wallsAbove', 'dungeon-tileset', x, y),
      floor: tilemap.createStaticLayer('floor', 'dungeon-tileset', x, y)
    }

    layers.wallsBelow.setDepth(Depths.wallsBelow);
    layers.wallsAbove.setDepth(Depths.wallsAbove);
    layers.floor.setDepth(Depths.floor);

    return layers;
  }

  private createDungeonTiles(tilemap: Phaser.Tilemaps.Tilemap, layers: DungeonLayers): DungeonTile[] {
    const tileData: Record<string, Record<string, any>> = {};

    layers.wallsBelow.forEachTile(function(tile: Phaser.Tilemaps.Tile) {
      const key = `${tile.x},${tile.y}`;
      tileData[key] = Object.assign({}, tile.properties, tileData[key] ?? {})
    }, this, 0, 0, tilemap.width, tilemap.height, {
      isNotEmpty: true
    });

    layers.wallsAbove.forEachTile(function(tile: Phaser.Tilemaps.Tile) {
      const key = `${tile.x},${tile.y}`;
      tileData[key] = Object.assign({}, tile.properties, tileData[key] ?? {})
    }, this, 0, 0, tilemap.width, tilemap.height, {
      isNotEmpty: true
    });

    layers.floor.forEachTile(function(tile: Phaser.Tilemaps.Tile) {
      const key = `${tile.x},${tile.y}`;
      tileData[key] = Object.assign({}, tile.properties, tileData[key] ?? {})
    }, this, 0, 0, tilemap.width, tilemap.height, {
      isNotEmpty: true
    });

    return Object.entries(tileData).map(([key, properties]) => {
      const [gridX, gridY] = key.split(',').map(Number);
      const worldCoordinates = layers.floor.tileToWorldXY(gridX, gridY);

      return new DungeonTile(gridX, gridY, worldCoordinates.x, worldCoordinates.y, properties);
    });
  }

  private createDungeonMarkers(tilemap: Phaser.Tilemaps.Tilemap, layers: DungeonLayers, x: number, y: number): Record<string, DungeonMarker> {
    const markers = tilemap.getObjectLayer('markers').objects;
    const dungeonMarkers: Record<string, DungeonMarker> = markers.reduce((acc, marker) => {
      const gridCoordinates = layers.floor.getTileAtWorldXY(marker.x! + x, marker.y! + y);
      const worldCoordinates = layers.floor.tileToWorldXY(gridCoordinates.x, gridCoordinates.y);

      acc[marker.name] = new DungeonMarker(marker.name, gridCoordinates.x, gridCoordinates.y, worldCoordinates.x, worldCoordinates.y);

      return acc;
    }, {} as Record<string, DungeonMarker>);

    return dungeonMarkers;
  }
}
