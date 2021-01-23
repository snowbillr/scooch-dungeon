import { NinePatch } from '@koreez/phaser3-ninepatch';

export class LevelSelectBox {
  private box: NinePatch;

  constructor(
    private scene: Phaser.Scene
  ) {
    this.box = (scene.add as any).ninePatch(scene.scale.width / 2, -300, 250, 300, 'menubox', null, {
      top: 16,
      bottom: 16,
      left: 16,
      right: 16
    }) as NinePatch;
    this.box.setScrollFactor(0);
  }

  destroy() {
    this.box.destroy();
  }
}
