import { ScoochDungeonScene } from './scooch-dungeon-scene';
import { SCENE_KEYS } from '../constants/scene-keys';
import { LEVELS_COUNT } from '../plugins/global/level-manager-plugin';
import { Viewport } from '../constants/viewport';
import { ProgressDocument } from '../persistence/progress-document';

export class LevelSelectScene extends ScoochDungeonScene {
  constructor() {
    super({ key: SCENE_KEYS.LEVEL_SELECT });
  }

  create() {
    this.cameras.main.setBackgroundColor(0x3D253B);

    const x = this.scale.width / 2;
    const yStep = -40;
    const startingY = this.scale.height - 64;
    for (let i = 0; i < LEVELS_COUNT; i++) {
      new LevelButton(this, i, x, startingY + (yStep * i));
    }
  }
}

class LevelButton {
  private gameObject: Phaser.GameObjects.Container;
  private button: Phaser.GameObjects.Sprite;
  private star: Phaser.GameObjects.Sprite;

  private enabled: boolean = true;
  private completed: boolean = false;

  constructor(private scene: ScoochDungeonScene, private levelNumber: number, x: number, y: number) {
    const progress = scene.persistence.getDocument<ProgressDocument>('progress');
    const levelProgress = progress.getLevelProgress(levelNumber);

    this.enabled = levelProgress?.attempts?.length > 0 || progress.getLastCompletedLevelNumber() === levelNumber - 1;
    this.completed = levelProgress?.attempts?.length > 0;

    this.gameObject = scene.add.container(x, y);
    this.gameObject.add([
      this.button = scene.add.sprite(0, 0, 'level-button'),
      this.star = scene.add.sprite(0, -1, 'star'),
      scene.add.bitmapText(-1, -2, 'matchup-24', String(levelNumber)).setOrigin(0.5)
    ]);

    this.gameObject.setSize(32, 32);

    if (this.enabled) {
      this.gameObject.setInteractive()
        .on(Phaser.Input.Events.POINTER_DOWN, () => {
          this.button.setFrame(1);
        })
        .on(Phaser.Input.Events.POINTER_OUT, () => {
          this.button.setFrame(0);
        })
        .on(Phaser.Input.Events.POINTER_UP, () => {
          this.button.setFrame(0);
          this.onPress();
        });
    } else {
      this.button.setFrame(2);
    }

    this.star.setVisible(this.completed);
  }

  onPress() {
    this.scene.levelManager.setCurrentLevelNumber(this.levelNumber);
    this.scene.scene.start(SCENE_KEYS.DUNGEON);
  }
}
