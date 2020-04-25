import Phaser from 'phaser';
import { PhecsPlugin } from 'phecs';
import { DungeonScene } from './scenes/dungeon-scene';
import { PreloadScene } from './scenes/preload-scene';
import { TitleScene } from './scenes/title-scene';
import { Viewport } from './constants/viewport';
import { LevelManagerPlugin } from './plugins/level-manager-plugin';
import { PersistencePlugin } from './plugins/persistence-plugin';
import { BootScene } from './scenes/boot-scene';

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
  BootScene,
  PreloadScene,
  TitleScene,
  DungeonScene
];

const game = new Phaser.Game({
  width: Viewport.WIDTH,
  height: Viewport.HEIGHT,
  scene: scenes,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  render: {
    pixelArt: true
  },
  plugins: {
    scene: [
      {
        key: 'Phecs',
        plugin: PhecsPlugin,
        mapping: 'phecs',
      }
    ],
    global: [
      { key: 'LevelManagerPlugin', plugin: LevelManagerPlugin, mapping: 'levelManager', start: true },
      { key: 'PersistencePlugin', plugin: PersistencePlugin, mapping: 'persistence', start: true },
    ],
  }
});