import Phaser from 'phaser';
import { PhecsPlugin } from 'phecs';
import { DungeonScene } from './scenes/dungeon-scene';

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

  create() {
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
  scene: [DungeonScene],
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