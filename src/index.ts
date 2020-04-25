import Phaser from 'phaser';
import { PhecsPlugin } from 'phecs';
import { DungeonScene } from './scenes/dungeon-scene';
import { Viewport } from './constants/viewport';
import { PreloadScene } from './scenes/preload-scene';
import { LevelManagerPlugin } from './plugins/level-manager-plugin';
import { TitleScene } from './scenes/title-scene';

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

const scenes = [
  PreloadScene,
  TitleScene,
  DungeonScene
];

const game = new Phaser.Game({
  width: Viewport.WIDTH,
  height: Viewport.HEIGHT,
  scene: scenes,
  plugins: {
    scene: [
      {
        key: 'Phecs',
        plugin: PhecsPlugin,
        mapping: 'phecs',
      }
    ],
    global: [
      { key: 'LeveLManagerPlugin', plugin: LevelManagerPlugin, mapping: 'levelManager', start: true },
    ],
  }
});