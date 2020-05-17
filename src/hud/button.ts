export enum ButtonStyle {
  NONE,
  BACKGROUND,
  BACKGROUND_INVERSE,
};

type ButtonContent = string | Phaser.GameObjects.GameObject;

export class Button extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number, style: ButtonStyle, content: ButtonContent, onPress: () => void) {
    super(scene, x, y);

    let backgroundTexture = null;
    if (style === ButtonStyle.BACKGROUND) {
      backgroundTexture = 'hud-button';
    } else if (style === ButtonStyle.BACKGROUND_INVERSE) {
      backgroundTexture = 'hud-button-inverse'
    }

    if (backgroundTexture) {
      this.add(scene.add.image(0, 0, backgroundTexture));
    }

    this.add(this.normalizeContent(content));

    const bounds = this.getBounds();
    this.setSize(bounds.width, bounds.height);
    this.setInteractive()
    this.on(Phaser.Input.Events.POINTER_DOWN, () => {
      onPress();
    });

    scene.add.existing(this);
  }

  normalizeContent(content: ButtonContent) {
    if (typeof content === 'string') {
      return this.scene.add.image(0, 0, content);
    } else {
      return content;
    }
  }
}
