import { DungeonObject, DungeonObjectConstructor } from "./dungeon-object";
import { Depths } from "../constants/depths";
import { DungeonTile } from './dungeon-tile';
import { Spikes } from './objects/spikes';
import { DungeonScene } from '../scenes/dungeon-scene';

type ObjectProperties = {
  name: string;
  tileIndex?: number;
  texture: string;
  frame?: number | string;
  animation?: string;
  depth: number;
  klass?: DungeonObjectConstructor;
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
    name: 'spikes',
    tileIndex: 101,
    texture: 'spikes',
    frame: 0,
    depth: Depths.spikes,
    klass: Spikes
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
    private readonly scene: DungeonScene
  ) {}

  createByIndex(dungeonTile: DungeonTile, tileIndex: number) {
    const objectProperties = Object.values(objectPropertiesList).find(p => p.tileIndex === tileIndex);
    if (!objectProperties) throw new Error(`DungeonObjectFactory: missing properties for ${tileIndex}`);

    return this.create(dungeonTile, objectProperties);
  }

  createByName(dungeonTile: DungeonTile, name: string) {
    const objectProperties = Object.values(objectPropertiesList).find(p => p.name === name);
    if (!objectProperties) throw new Error(`DungeonObjectFactory: missing properties for ${name}`);

    return this.create(dungeonTile, objectProperties);
  }

  private create(dungeonTile: DungeonTile, objectProperties: ObjectProperties) {
    const texture = objectProperties.texture;
    const frame = objectProperties.frame;
    const depth = objectProperties.depth;

    const sprite = this.scene.add.sprite(dungeonTile.worldX, dungeonTile.worldY, texture, frame)
      .setOrigin(0)
      .setDepth(depth);

    const name = objectProperties.name;

    const animationName = objectProperties.animation;
    if (animationName) {
      sprite.anims.play(animationName);
    }

    const Klass = objectProperties.klass || DungeonObject;

    return new Klass(this.scene, dungeonTile, name, sprite);
  }
}
