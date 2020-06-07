import { ScoochDungeonScene } from './scooch-dungeon-scene';
import { SCENE_KEYS } from '../constants/scene-keys';
import { Viewport } from '../constants/viewport';
import { Button, ButtonStyle } from '../hud/button';

export class DeathScene extends ScoochDungeonScene {
  constructor() {
    super({ key: SCENE_KEYS.DEATH });
  }

  create() {
    this.cameras.main.setBackgroundColor('#3d253b');

    new Button(
      this,
      Viewport.WIDTH / 2,
      Viewport.HEIGHT / 2 - 50,
      ButtonStyle.BACKGROUND,
      this.add.bitmapText(0, 0, 'matchup-24', 'Restart Level').setOrigin(0.5),
      () => this.fadeToScene(SCENE_KEYS.DUNGEON)
    );

    new Button(
      this,
      Viewport.WIDTH / 2,
      Viewport.HEIGHT / 2 + 50,
      ButtonStyle.BACKGROUND,
      this.add.bitmapText(0, 0, 'matchup-24', 'Quit to Title').setOrigin(0.5),
      () => this.fadeToScene(SCENE_KEYS.TITLE)
    );
  }

  fadeToScene(sceneKey: string) {
    this.cameras.main.fadeOut(500, 0, 0, 0, (camera: any, progress: number) => {
      if (progress > 0.99) {
        this.scene.start(sceneKey);
      }
    });
  }
}
