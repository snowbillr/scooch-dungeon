import Phaser from 'phaser';
import { PhecsPlugin } from 'phecs';

class GameScene extends Phaser.Scene {
  phecs: PhecsPlugin;

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
    this.load.image('dungeon-tileset', 'assets/maps/dungeon-tileset.png');

    this.load.spritesheet('hero', 'assets/characters/hero.png', { frameWidth: 32, frameHeight: 56 });
  }

  create() {
    this.cameras.main.setBackgroundColor(0xCCCCCC);
    this.add.sprite(100, 100, 'hero');
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