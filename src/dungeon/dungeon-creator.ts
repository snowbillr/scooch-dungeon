import { Depths } from '../constants/depths';
import { Dungeon } from './dungeon';
import { DungeonTile } from './dungeon-tile';
import { HeroPrefab } from '../prefabs/hero/prefab';
import { DungeonMarker } from './dungeon-marker';

export class DungeonCreator {
  private level!: Phaser.Tilemaps.Tilemap;
  private markers!: Phaser.Types.Tilemaps.TiledObject[];
  private layers: Record<string, Phaser.Tilemaps.StaticTilemapLayer | Phaser.Tilemaps.DynamicTilemapLayer>;

  constructor(
    private scene: Phaser.Scene,
    private levelTilemapKey: string
  ) {
    this.layers = {};
  }

  public load() {
    this.level = this.scene.add.tilemap(this.levelTilemapKey);
    this.level.addTilesetImage('dungeon-tileset', 'dungeon-spritesheet');

    this.markers = this.level.getObjectLayer('markers').objects;
  }

  public createDungeon(x: number, y: number): Dungeon {
    this.layers.wallsBelow = this.level.createStaticLayer('wallsBelow', 'dungeon-tileset', x, y);
    this.layers.wallsBelow.setDepth(Depths.wallsBelow);

    this.layers.wallsAbove = this.level.createStaticLayer('wallsAbove', 'dungeon-tileset', x, y);
    this.layers.wallsAbove.setDepth(Depths.wallsAbove);

    this.layers.floor = this.level.createStaticLayer('floor', 'dungeon-tileset', x, y);
    this.layers.floor.setDepth(Depths.floor);

    const tileData: Record<string, Record<string, any>> = {};

    this.layers.wallsBelow.forEachTile(function(tile: Phaser.Tilemaps.Tile) {
      const key = `${tile.x},${tile.y}`;
      tileData[key] = Object.assign({}, tile.properties, tileData[key] ?? {})
    }, this, 0, 0, this.level.width, this.level.height, {
      isNotEmpty: true
    });

    this.layers.wallsAbove.forEachTile(function(tile: Phaser.Tilemaps.Tile) {
      const key = `${tile.x},${tile.y}`;
      tileData[key] = Object.assign({}, tile.properties, tileData[key] ?? {})
    }, this, 0, 0, this.level.width, this.level.height, {
      isNotEmpty: true
    });

    this.layers.floor.forEachTile(function(tile: Phaser.Tilemaps.Tile) {
      const key = `${tile.x},${tile.y}`;
      tileData[key] = Object.assign({}, tile.properties, tileData[key] ?? {})
    }, this, 0, 0, this.level.width, this.level.height, {
      isNotEmpty: true
    });

    const dungeonTiles: DungeonTile[] = Object.entries(tileData).map(([key, properties]) => {
      const [gridX, gridY] = key.split(',').map(Number);
      const worldCoordinates = this.layers.floor.tileToWorldXY(gridX, gridY);

      return new DungeonTile(gridX, gridY, worldCoordinates.x, worldCoordinates.y, properties);
    });

    const dungeonMarkers: Record<string, DungeonMarker> = this.markers.reduce((acc, marker) => {
      const gridCoordinates = this.layers.floor.getTileAtWorldXY(marker.x! + x, marker.y! + y);
      const worldCoordinates = this.layers.floor.tileToWorldXY(gridCoordinates.x, gridCoordinates.y);

      acc[marker.name] = new DungeonMarker(marker.name, gridCoordinates.x, gridCoordinates.y, worldCoordinates.x, worldCoordinates.y);

      return acc;
    }, {} as Record<string, DungeonMarker>);

    return new Dungeon(dungeonTiles, dungeonMarkers);
  }
}
