export class DungeonObjectFactory {
  constructor(
    private readonly scene: Phaser.Scene
  ) {}

  create(worldX: number, worldY: number, tileIndex: number) {
    switch (tileIndex) {
      case 85:
        this.scene.add.sprite(worldX, worldY, 'objective', 0)
          .setOrigin(0);
        break;
      case 50: 
        this.scene.add.image(worldX, worldY, 'rock')
          .setOrigin(0);
        break;
    }
  }
}