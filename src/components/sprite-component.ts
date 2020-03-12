export class SpriteComponent {
  private scene: Phaser.Scene;
  private data: any;

  public sprite!: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, data: any) {
    this.scene = scene;
    this.data = data;
  }

  onAdd() {
    this.sprite = this.scene.add.sprite(this.data.x, this.data.y, this.data.texture);
    this.sprite.setDepth(this.data.depth);
  }
}