import { Depths } from '../constants/depths';
import { Dungeon } from './dungeon';
import { DungeonTile } from './dungeon-tile';
import { HeroPrefab } from '../prefabs/hero/prefab';

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
      const worldCoordinates = this.layers.floor.tileToWorldXY(gridX, gridY)
      worldCoordinates.add(new Phaser.Math.Vector2(16, 0)); // gets the center of the tile

      return new DungeonTile(gridX, gridY, worldCoordinates.x, worldCoordinates.y, properties);
    });

    return new Dungeon(dungeonTiles, this.layers.floor);
  }

  public getHeroStartWorldPosition(): Phaser.Math.Vector2 {
    const heroStartGridPosition = this.getHeroStartGridPosition();
    const heroWorldPosition = this.layers.floor.tileToWorldXY(heroStartGridPosition.x, heroStartGridPosition.y);

    heroWorldPosition.add(new Phaser.Math.Vector2(16, 0)); // this centers the hero in the tile

    return heroWorldPosition;
  }

  public getHeroStartGridPosition(): Phaser.Math.Vector2 {
    const heroStart = this.markers.find(marker => marker.name === 'hero-start');
    if (heroStart == null) {
      throw new Error('Load level: `hero-start` marker missing from `markers` object layer');
    }

    const heroStartTile = this.layers.floor.getTileAtWorldXY(heroStart.x! + 100, heroStart.y! + 100);

    return new Phaser.Math.Vector2(heroStartTile.x, heroStartTile.y);
  }

}