import { Depths } from "../constants/depths";
import { GridObjectConstructor, GridObject } from './grid-object';
import { GridTile } from './grid-tile';
import { ScoochDungeonScene } from '../scenes/scooch-dungeon-scene';

type GridObjectProperties = {
  name: string;
  tileIndex?: number;
  texture: string;
  frame?: number | string;
  animation?: string;
  depth: number;
  klass?: GridObjectConstructor;
}

export class GridObjectFactory {
  constructor(
    private readonly scene: ScoochDungeonScene,
    private readonly objectPropertiesList: GridObjectProperties[]
  ) {}

  createByIndex(dungeonTile: GridTile, tileIndex: number, extraProperties: Record<string, any>) {
    const objectProperties = Object.values(this.objectPropertiesList).find(p => p.tileIndex === tileIndex);
    if (!objectProperties) throw new Error(`GridObjectFactory: missing properties for ${tileIndex}`);

    return this.create(dungeonTile, objectProperties, extraProperties);
  }

  createByName(dungeonTile: GridTile, name: string) {
    const objectProperties = Object.values(this.objectPropertiesList).find(p => p.name === name);
    if (!objectProperties) throw new Error(`GridObjectFactory: missing properties for ${name}`);

    return this.create(dungeonTile, objectProperties);
  }

  private create(dungeonTile: GridTile, objectProperties: GridObjectProperties, extraProperties: Record<string, any> = {}) {
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

    const Klass = objectProperties.klass || GridObject;

    return new Klass(this.scene, dungeonTile, name, sprite, extraProperties);
  }
}
