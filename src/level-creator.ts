export class LevelCreator {
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

  public createMap(x: number, y: number) {
    this.layers.floor = this.level.createStaticLayer('floor', 'dungeon-tileset', x, y);
    this.layers.walls = this.level.createStaticLayer('walls', 'dungeon-tileset', x, y);

    // const hero = this.add.sprite(heroPosition.x + 16, heroPosition.y + 16, 'hero');
  }

  public getHeroStartWorldPosition(): Phaser.Math.Vector2 {
    const heroStart = this.markers.find(marker => marker.name === 'hero-start');
    if (heroStart == null) {
      throw new Error('Load level: `hero-start` marker missing from `markers` object layer');
    }
    const heroStartTile = this.layers.floor.getTileAtWorldXY(heroStart.x! + 100, heroStart.y! + 100);

    const heroWorldPosition = this.layers.floor.tileToWorldXY(heroStartTile.x, heroStartTile.y);
    heroWorldPosition.add(new Phaser.Math.Vector2(16, 16));

    return heroWorldPosition;
  }
}