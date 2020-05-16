import { SCENE_KEYS } from '../constants/scene-keys';

const buttonStyle = {
  fontSize: '16px',
  color: '#fff',
  backgroundColor: '#44BF95',
  stroke: '#000000',
  strokeThickness: 3,
  padding: { left: 10, right: 10, top: 5, bottom: 5 }
}

const titleStyle = {
  fontSize: '38px',
  color: '#fff',
  stroke: '#000000',
  strokeThickness: 3,
}

export class DebugScene extends Phaser.Scene {
  private buttons: Phaser.GameObjects.GameObject[];

  constructor() {
    super({ key: SCENE_KEYS.DEBUG });

    this.buttons = [];
  }

  create() {
    this.input.keyboard.createCombo('debug', { resetOnMatch: true });
    this.input.keyboard.on('keycombomatch', (e: any) => {
      if (e.keyCodes.join() === [68, 69, 66, 85, 71].join()) { // this is "debug" in key codes
        this.showScene();
      }
    });

    this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000, 0.6).setOrigin(0);
    this.add.text(this.scale.width / 2, 100, 'DEBUG menu', titleStyle).setOrigin(0.5);

    this.addButtons();

    this.hideScene();

    this.scene.bringToTop();
    this.scene.launch(SCENE_KEYS.BOOT);
  }

  private addButtons() {
    this.addButton(this.scale.width - 30, 30, 'X', () => this.hideScene());
    this.addButton(this.scale.width / 2, 150, 'clear save data', () => {
      localStorage.clear();
      location.reload();
    });
  }

  private addButton(x: number, y: number, text: string, onPress: () => void) {
    this.buttons.push(this.add.text(x, y, text, buttonStyle)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on(Phaser.Input.Events.POINTER_DOWN, onPress)
    );
  }

  private showScene() {
    this.scene.setVisible(true);
    this.buttons.forEach(button => button.input.enabled = true);
  }

  private hideScene() {
    this.buttons.forEach(button => button.input.enabled = false);
    this.scene.setVisible(false);
  }
}
