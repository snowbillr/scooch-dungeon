import { DungeonObject } from "./dungeon-object";

const tileIndexToTexture: Record<number, string> = {
  85: 'objective',
  87: 'coin',
  50: 'rock'
};

const tileIndexToFrame: Record<number, number | string> = {
  85: 0,
  87: 0
};

const tileIndexToName: Record<number, string> = {
  85: 'objective',
  87: 'coin',
  50: 'rock'
};

const tileIndexToAnimation: Record<number, string> = {
  87: 'coin-spin'
};

export class DungeonObjectFactory {
  constructor(
    private readonly scene: Phaser.Scene
  ) {}

  create(worldX: number, worldY: number, tileIndex: number) {
    const texture = tileIndexToTexture[tileIndex];
    const frame = tileIndexToFrame[tileIndex];

    const sprite = this.scene.add.sprite(worldX, worldY, texture, frame)
      .setOrigin(0);

    const name = tileIndexToName[tileIndex];

    const animationName = tileIndexToAnimation[tileIndex];
    if (animationName) {
      sprite.anims.play(animationName);
    }

    return new DungeonObject(name, sprite);
  }
}