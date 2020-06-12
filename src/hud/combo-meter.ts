export class ComboMeter {
  public gameObject: Phaser.GameObjects.Sprite;

  constructor(private scene: Phaser.Scene, x: number, y: number) {
    this.gameObject = scene.add.sprite(x, y, 'combo-meter-1');
  }

  increaseTo(multiplier: number, step: number) {
    this.gameObject.setTexture(this.getTexture(multiplier), step)

    this.scene.tweens.add({
      targets: this.gameObject,
      props: {
        scale: step === 0 ? 1.4 : 1.1
      },
      yoyo: true,
      duration: 100
    });
  }

  reset() {
    this.gameObject.setTexture(this.getTexture(1), 0);

    this.scene.tweens.timeline({
      targets: this.gameObject,
      tweens: [
        {
          props: {
            x: '+=5'
          },
          yoyo: true,
          duration: 50
        },
        {
          props: {
            x: '-=5'
          },
          yoyo: true,
          duration: 50
        },
        {
          props: {
            x: '+=5'
          },
          yoyo: true,
          duration: 50
        }
      ]
    });
  }

  private getTexture(multiplier: number) {
    switch (multiplier) {
      case 1: return 'combo-meter-1';
      case 2: return 'combo-meter-2';
      case 3: return 'combo-meter-3';
      case 4: return 'combo-meter-max';
    }

    throw new Error("ComboMeter - missing texture for multiplier");
  }
}
