import Phaser from 'phaser';
import { PhecsPlugin } from 'phecs';
import { LevelCreator } from './level-creator';
import { Depths } from './constants/depths';

class GameScene extends Phaser.Scene {
  phecs!: PhecsPlugin;

  init() {
    /*
    this.phecs.register.system(PointDisplaySystem);

    this.phecs.register.prefab('point', {
      components: [
        {
          component: PointComponent,
        }
      ]
    });
    */
  }

  preload() {
    this.load.image('dungeon-spritesheet', 'assets/maps/dungeon-spritesheet.png');
    this.load.tilemapTiledJSON('level-001', 'assets/levels/001.json');

    this.load.spritesheet('hero', 'assets/characters/hero/spritesheet.png', { frameWidth: 32, frameHeight: 56 });
    this.load.animation('hero-animations', 'assets/characters/hero/animations.json');
  }

  create() {
    this.cameras.main.setBackgroundColor(0xCCCCCC);

    const levelCreator = new LevelCreator(this, 'level-001');
    levelCreator.load();
    levelCreator.createMap(100, 100);

    const heroStartWorldCoordinates = levelCreator.getHeroStartWorldPosition();
    const hero = this.add.sprite(heroStartWorldCoordinates.x, heroStartWorldCoordinates.y, 'hero');
    hero.setDepth(Depths.hero);

    /*
    this.phecs.add.prefab('point', {}, 10, 20);
    this.phecs.add.prefab('point', {}, 100, 20);
    this.phecs.add.prefab('point', {}, 50, 100);

    this.phecs.add.entity([PointComponent], 100, 100);
    */
  }
}

const game = new Phaser.Game({
  width: 352,
  height: 600,
  scene: [GameScene],
  plugins: {
    scene: [
      {
        key: 'Phecs',
        plugin: PhecsPlugin,
        mapping: 'phecs',
      }
    ]
  }
});