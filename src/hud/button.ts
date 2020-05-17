import { NinePatch } from '@koreez/phaser3-ninepatch';

export enum ButtonStyle {
  NONE,
  BACKGROUND,
  BACKGROUND_INVERSE,
};

type ButtonContent = string | Phaser.GameObjects.Sprite | Phaser.GameObjects.Image | Phaser.GameObjects.BitmapText;

export class Button {
  private scene: Phaser.Scene;

  public gameObject: NinePatch | Phaser.GameObjects.Container;

  constructor(scene: Phaser.Scene, x: number, y: number, style: ButtonStyle, content: ButtonContent, onPress: () => void) {
    this.scene = scene;

    let width;
    let height;
    const normalizedContent = this.normalizeContent(content);
    if (normalizedContent instanceof Phaser.GameObjects.BitmapText) {
      const bitmapTextSize = normalizedContent.getTextBounds();
      width = bitmapTextSize.global.width;
      height = bitmapTextSize.global.height;
    } else {
      const bounds = normalizedContent.getBounds();
      width = bounds.width;
      height = bounds.height;
    }


    let backgroundTexture = '';
    if (style === ButtonStyle.BACKGROUND) {
      backgroundTexture = 'hud-button';
    } else if (style === ButtonStyle.BACKGROUND_INVERSE) {
      backgroundTexture = 'hud-button-inverse'
    }

    if (backgroundTexture) {
      this.gameObject = new NinePatch(scene, x, y, 1, 1, backgroundTexture, undefined, {
        top: 16,
        bottom: 16,
        left: 16,
        right: 16
      });
      (this.gameObject as NinePatch).resize(width + 32, height + 32);
    } else {
      this.gameObject = new Phaser.GameObjects.Container(scene, x, y);
      this.gameObject.setSize(width, height);
    }

    this.gameObject.add(normalizedContent);
    this.gameObject.setInteractive();
    this.gameObject.on(Phaser.Input.Events.POINTER_DOWN, onPress);

      scene.add.existing(this.gameObject);
  }

  normalizeContent(content: ButtonContent) {
    if (typeof content === 'string') {
      return this.scene.add.image(0, 0, content);
    } else {
      return content;
    }
  }
}
