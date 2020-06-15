import levels from '../../data/levels.json';
import { ScoochDungeonScene } from './scooch-dungeon-scene';
import { SCENE_KEYS } from '../constants/scene-keys';
import { ProgressDocument } from '../persistence/progress-document';
import { LevelGroup } from '../levels/level-group';

export class LevelSelectScene extends ScoochDungeonScene {
  constructor() {
    super({ key: SCENE_KEYS.LEVEL_SELECT });
  }

  create() {
    this.cameras.main.setBackgroundColor(0x3D253B);

    const x = this.scale.width / 2;
    const yStep = -32;
    let y = this.scale.height - 64;

    levels.levelGroups.forEach(levelGroup => {
      const levelGroupDisplay = new LevelGroupDisplay(this, levelGroup.name, x, y);
      y -= levelGroupDisplay.gameObject.getBounds().height - yStep;
    })
  }
}

class LevelGroupDisplay {
  public gameObject: Phaser.GameObjects.Container;

  constructor(private scene: ScoochDungeonScene, private levelGroupName: string, x: number, y: number) {
    const levelGroup = new LevelGroup(levelGroupName);
    const levels = levelGroup.getLevels();

    const yStep = -40;
    const levelButtons = levels.map((level, i) => {
      return new LevelButton(scene, level.getIndex(), 0, yStep * i)
    });

    //                          level buttons
    //                                                 level buttons padding
    const levelButtonHeight = (levels.length * 32) + ((levels.length + 1) * 8);

    this.gameObject = scene.add.container(x, y, [
      scene.add.rectangle(0, -levelButtonHeight / 2 + 24, 64, levelButtonHeight)
        .setStrokeStyle(6, 0xD9A066),
      ...levelButtons.map(lb => lb.gameObject)
    ]);
  }
}

class LevelButton {
  public gameObject: Phaser.GameObjects.Container;
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
