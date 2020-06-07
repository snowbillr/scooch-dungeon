const LEVELS = [
  {
    max: false,
    steps: 4,
    texture: 'combo-meter-0'
  },
  {
    max: false,
    steps: 5,
    texture: 'combo-meter-1'
  },
  {
    max: false,
    steps: 6,
    texture: 'combo-meter-2'
  },
  {
    max: true,
    steps: 0,
    texture: 'combo-meter-max'
  }
];

export class ComboMeter {
  public gameObject: Phaser.GameObjects.Sprite;

  private currentLevel: number;
  private currentStep: number;

  constructor(private scene: Phaser.Scene, x: number, y: number) {
    this.gameObject = scene.add.sprite(x, y, 'combo-meter-0');

    this.currentLevel = 0;
    this.currentStep = 0;
  }

  step() {
    if (LEVELS[this.currentLevel].max) return;

    this.currentStep += 1;
    if (this.currentStep + 1 > LEVELS[this.currentLevel].steps) {
      this.currentLevel += 1;
      this.currentStep = 0;
    }

    this.updateDisplay();
  }

  reset() {
    this.currentLevel = 0;
    this.currentStep = 0;

    this.updateDisplay();
  }

  private updateDisplay() {
    if (LEVELS[this.currentLevel].max) {
      this.gameObject.setTexture(LEVELS[this.currentLevel].texture);
    } else {
      this.gameObject.setTexture(LEVELS[this.currentLevel].texture);
      this.gameObject.setFrame(this.currentStep);

      this.scene.tweens.add({
        targets: this.gameObject,
        props: {
          scale: this.currentStep === 0 ? 1.4 : 1.1
        },
        yoyo: true,
        duration: 100
      });
    }
  }
}
