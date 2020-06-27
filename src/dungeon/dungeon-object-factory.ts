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

export class DungeonObjectFactory {
  constructor(
    private readonly scene: DungeonScene,
    private readonly objectPropertiesList: ObjectProperties[]
  ) {}

  createByIndex(dungeonTile: DungeonTile, tileIndex: number, extraProperties: Record<string, any>) {
    const objectProperties = Object.values(this.objectPropertiesList).find(p => p.tileIndex === tileIndex);
    if (!objectProperties) throw new Error(`DungeonObjectFactory: missing properties for ${tileIndex}`);

    return this.create(dungeonTile, objectProperties, extraProperties);
  }

  createByName(dungeonTile: DungeonTile, name: string) {
    const objectProperties = Object.values(this.objectPropertiesList).find(p => p.name === name);
    if (!objectProperties) throw new Error(`DungeonObjectFactory: missing properties for ${name}`);

    return this.create(dungeonTile, objectProperties);
  }

  private create(dungeonTile: DungeonTile, objectProperties: ObjectProperties, extraProperties: Record<string, any> = {}) {
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

    return new Klass(this.scene, dungeonTile, name, sprite, extraProperties);
  }
}
