import { Viewport } from "../constants/viewport";

export class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'title' });
  }

  create() {
    this.cameras.main.setBackgroundColor(0x25131a);

    const logo = this.add.image(-300, 100, 'logo')
      .setScale(0.6);

    const playButton = this.addButton(this.cameras.main.centerX, Viewport.HEIGHT + 100, 'PLAY', () => this.scene.start('dungeon', { levelNumber: 1 }));

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

  private addButton(x: number, y: number, text: string, onPress: () => void) {
    const width = 200;
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

    const playText = this.add.bitmapText(0, -5, 'matchup-64', 'PLAY')
      .setOrigin(0.5)

    container.add(buttonOuter);
    container.add(buttonInner);
    container.add(playText);

    return container;
  }
}