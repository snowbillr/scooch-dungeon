export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'preload' });
  }

  preload() {
    this.load.image('dungeon-spritesheet', 'assets/maps/dungeon-spritesheet.png');
    this.load.tilemapTiledJSON('level-001', 'assets/levels/001.json');
    this.load.tilemapTiledJSON('level-002', 'assets/levels/002.json');
    this.load.tilemapTiledJSON('level-003', 'assets/levels/003.json');

    this.load.spritesheet('hero', 'assets/characters/hero/spritesheet.png', { frameWidth: 32, frameHeight: 56 });
    this.load.animation('hero-animations', 'assets/characters/hero/animations.json');
  }

  create() {
    this.scene.start('dungeon', { levelNumber: 1 });
  }
}