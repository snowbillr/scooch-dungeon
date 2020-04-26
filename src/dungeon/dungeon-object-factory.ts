import { DungeonObject } from "./dungeon-object";

const tileIndexToTexture: Record<number, string> = {
  85: 'objective',
  50: 'rock'
};

const tileIndexToFrame: Record<number, number | string> = {
  85: 0
};

const tileIndexToName: Record<number, string> = {
  85: 'objective',
  50: 'rock'
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

    return new DungeonObject(name, sprite);
  }
}