import { DungeonObject } from "./dungeon-object";
import { Depths } from "../constants/depths";

type ObjectProperties = {
  name: string;
  tileIndex?: number;
  texture: string;
  frame?: number | string;
  animation?: string;
  depth: number;
}

const objectPropertiesList = [
  {
    name: 'rock',
    tileIndex: 50,
    texture: 'rock',
    depth: Depths.rock
  },
  {
    name: 'objective',
    tileIndex: 85,
    texture: 'objective',
    frame: 0,
    depth: Depths.objective
  },
  {
    name: 'coin',
    tileIndex: 87,
    texture: 'coin',
    frame: 0,
    animation: 'coin-spin',
    depth: Depths.coin
  },
  {
    name: 'swipe-indicator',
    texture: 'swipe-indicator',
    frame: 0,
    animation: 'swipe-indicator-bounce',
    depth: Depths['swipe-indicator']
  }
];

export class DungeonObjectFactory {
  constructor(
    private readonly scene: Phaser.Scene
  ) {}

  createByIndex(worldX: number, worldY: number, tileIndex: number) {
    const objectProperties = Object.values(objectPropertiesList).find(p => p.tileIndex === tileIndex);

    if (!objectProperties) throw new Error(`DungeonObjectFactory: missing properties for ${tileIndex}`);

    return this.create(worldX, worldY, objectProperties);
  }

  createByName(worldX: number, worldY: number, name: string) {
    const objectProperties = Object.values(objectPropertiesList).find(p => p.name === name);

    if (!objectProperties) throw new Error(`DungeonObjectFactory: missing properties for ${name}`);

    return this.create(worldX, worldY, objectProperties);
  }

  private create(x: number, y: number, objectProperties: ObjectProperties) {
    const texture = objectProperties.texture;
    const frame = objectProperties.frame;
    const depth = objectProperties.depth;

    const sprite = this.scene.add.sprite(x, y, texture, frame)
      .setOrigin(0)
      .setDepth(depth);

    const name = objectProperties.name;

    const animationName = objectProperties.animation;
    if (animationName) {
      sprite.anims.play(animationName);
    }

    return new DungeonObject(name, sprite);
  }
}