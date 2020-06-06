import { ScoochDungeonScene } from './scooch-dungeon-scene';
import { SCENE_KEYS } from '../constants/scene-keys';
import { Viewport } from '../constants/viewport';

export class DeathScene extends ScoochDungeonScene {
  constructor() {
    super({ key: SCENE_KEYS.DEATH });
  }

  create() {
    this.cameras.main.setBackgroundColor('#3d253b');

    this.add.bitmapText(Viewport.WIDTH / 2, Viewport.HEIGHT / 2, 'matchup-32', 'dead')
      .setOrigin(0.5)
  }
}
