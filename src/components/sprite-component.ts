export class SpriteComponent {
  public sprite: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, data: any) {
    this.sprite = scene.add.sprite(data.x, data.y, data.texture);
    this.sprite.setDepth(data.depth);
  }
}