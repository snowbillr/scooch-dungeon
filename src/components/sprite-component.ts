export class SpriteComponent {
  private scene: Phaser.Scene;
  
  private x: number;
  private y: number;
  private texture: string;
  private depth: number;

  public sprite!: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, data: any) {
    this.scene = scene;

    this.x = data.x;
    this.y = data.y;
    this.texture = data.texture;
    this.depth = data.depth;
  }

  onAdd() {
    this.sprite = this.scene.add.sprite(this.x, this.y, this.texture);
    this.sprite.setDepth(this.depth);
  }
}