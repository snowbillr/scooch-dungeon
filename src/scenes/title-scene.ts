import { Viewport } from "../constants/viewport";
import { ScoochDungeonScene } from "./scooch-dungeon-scene";
import { ProgressDocument } from "../persistence/progress-document";
import { SCENE_KEYS } from '../constants/scene-keys';
import { DebugScene } from './debug-scene';

export class TitleScene extends ScoochDungeonScene {
  constructor() {
    super({ key: SCENE_KEYS.TITLE });
  }

  create() {
    this.cameras.main.setBackgroundColor(0x3D253B);

    this.scene.launch(SCENE_KEYS.SFX);

    let clickCount = 0;
    const logo = this.add.image(-300, 100, 'logo')
      .setScale(0.6)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        clickCount += 1;
        if (clickCount >= 5) {
          (this.scene.get(SCENE_KEYS.DEBUG) as DebugScene).showScene();
        }
      })

    const progress = this.persistence.getDocument<ProgressDocument>('progress');
    const isNewGame = progress.getLastCompletedLevelNumber() === 0;
    const playButtonText = isNewGame ? 'Play' : 'Continue';
    const playButton = this.addButton(this.cameras.main.centerX, Viewport.HEIGHT + 100, playButtonText, () => {
      /*
      const progressDocument = this.persistence.getDocument<ProgressDocument>('progress');
      this.levelManager.setCurrentLevelNumber(progressDocument.getLastCompletedLevelNumber() + 1);
      this.scene.start(SCENE_KEYS.DUNGEON);
      */
     this.scene.start(SCENE_KEYS.LEVEL_SELECT);
    });

    this.tweens.timeline({
      tweens: [
        {
          targets: logo,
          props: {
            x: this.cameras.main.centerX
          },
          ease: Phaser.Math.Easing.Quadratic.Out,
          duration: 750,
        },
        {
          targets: playButton,
          props: {
            y: 300
          },
          offset: 300,
          ease: Phaser.Math.Easing.Quadratic.Out,
          duration: 550
        }
      ]
    });
  }

  private addButton(x: number, y: number, text: string, onPress: () => void, font?: string) {
    const width = 240;
    const height = 80;
    const borderWidth = 10;
    const borderHeight = 10;

    const container = this.add.container(x, y)
      .setSize(width, height)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, onPress);

    const buttonOuter = this.add.rectangle(0, 0, width, height, 0xDA4E38)
      .setOrigin(0.5)

    const buttonInner = this.add.rectangle(0, 0, width - borderWidth, height - borderHeight, 0xEE8D2E)
      .setOrigin(0.5)

    const playText = this.add.bitmapText(0, -5, font ?? 'matchup-64', text)
      .setOrigin(0.5)

    container.add(buttonOuter);
    container.add(buttonInner);
    container.add(playText);

    return container;
  }
}
