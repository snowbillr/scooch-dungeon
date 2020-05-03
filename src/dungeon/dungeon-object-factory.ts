import { DungeonObject } from "./dungeon-object";
import { Depths } from "../constants/depths";

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

const tileIndexToDepth: Record<number, number> = {
  85: Depths.objective,
  87: Depths.coin,
  50: Depths.rock
};

export class DungeonObjectFactory {
  constructor(
    private readonly scene: Phaser.Scene
  ) {}

  create(worldX: number, worldY: number, tileIndex: number) {
    const texture = tileIndexToTexture[tileIndex];
    const frame = tileIndexToFrame[tileIndex];
    const depth = tileIndexToDepth[tileIndex];

    const sprite = this.scene.add.sprite(worldX, worldY, texture, frame)
      .setOrigin(0)
      .setDepth(depth);

    const name = tileIndexToName[tileIndex];

    const animationName = tileIndexToAnimation[tileIndex];
    if (animationName) {
      sprite.anims.play(animationName);
    }

    return new DungeonObject(name, sprite);
  }
}