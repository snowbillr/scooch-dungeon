import { Depths } from '../constants/depths';
import { Dungeon } from './dungeon';
import { DungeonTile } from './dungeon-tile';

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
    const dungeonTiles: DungeonTile[] = [];

    this.layers.wallsBelow = this.level.createStaticLayer('wallsBelow', 'dungeon-tileset', x, y);
    this.layers.wallsBelow.setDepth(Depths.wallsBelow);

    this.layers.wallsAbove = this.level.createStaticLayer('wallsAbove', 'dungeon-tileset', x, y);
    this.layers.wallsAbove.setDepth(Depths.wallsAbove);

    this.layers.floor = this.level.createStaticLayer('floor', 'dungeon-tileset', x, y);
    this.layers.floor.setDepth(Depths.floor);

    
    this.layers.wallsBelow.forEachTile(function(tile: Phaser.Tilemaps.Tile) {
      dungeonTiles.push(new DungeonTile(tile.x, tile.y, tile.properties))
    }, this, 0, 0, this.level.width, this.level.height, {
      isNotEmpty: true
    });

    this.layers.wallsAbove.forEachTile(function(tile: Phaser.Tilemaps.Tile) {
      dungeonTiles.push(new DungeonTile(tile.x, tile.y, tile.properties))
    }, this, 0, 0, this.level.width, this.level.height, {
      isNotEmpty: true
    });

    this.layers.floor.forEachTile(function(tile: Phaser.Tilemaps.Tile) {
      dungeonTiles.push(new DungeonTile(tile.x, tile.y, tile.properties))
    }, this, 0, 0, this.level.width, this.level.height, {
      isNotEmpty: true
    });


    return new Dungeon(dungeonTiles);
  }

  public getHeroStartWorldPosition(): Phaser.Math.Vector2 {
    const heroStart = this.markers.find(marker => marker.name === 'hero-start');
    if (heroStart == null) {
      throw new Error('Load level: `hero-start` marker missing from `markers` object layer');
    }
    const heroStartTile = this.layers.floor.getTileAtWorldXY(heroStart.x! + 100, heroStart.y! + 100);

    const heroWorldPosition = this.layers.floor.tileToWorldXY(heroStartTile.x, heroStartTile.y);
    heroWorldPosition.add(new Phaser.Math.Vector2(16, 0)); // this centers the hero in the tile

    return heroWorldPosition;
  }
}