export class DungeonObject {
  constructor(
    public name: string,
    public sprite: Phaser.GameObjects.Sprite,
  ) {}

  destroy() {
    this.sprite.destroy();
  }
}