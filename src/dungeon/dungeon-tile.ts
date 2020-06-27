import { DungeonObject } from './dungeon-object';
import { Direction } from '../constants/directions';
import { ScoochDungeonScene } from '../scenes/scooch-dungeon-scene';
import { DungeonBehavior } from '../behaviors/dungeon-behavior';

export type DungeonTileProperties = {
  walkable: boolean;
  objective: boolean;
};

export enum DungeonTileBehaviorType {
  INPUT = 'INPUT',
  ENTER = 'ENTER',
  EXIT = 'EXIT'
};

export class DungeonTile {
  public behaviors: Record<DungeonTileBehaviorType, DungeonBehavior[]>;
  private objects: DungeonObject[];

  constructor(
    public readonly scene: ScoochDungeonScene,
    public readonly gridX: number,
    public readonly gridY: number,
    public readonly worldX: number,
    public readonly worldY: number,
    private properties: DungeonTileProperties
  ) {
    this.behaviors = {
      [DungeonTileBehaviorType.INPUT]: [],
      [DungeonTileBehaviorType.ENTER]: [],
      [DungeonTileBehaviorType.EXIT]: [],
    };

    this.objects = [];
  }

  destroy() {
    delete this.properties;

    this.objects.forEach(object => object.destroy());

    this.behaviors[DungeonTileBehaviorType.INPUT] = [];
    this.behaviors[DungeonTileBehaviorType.ENTER] = [];
    this.behaviors[DungeonTileBehaviorType.EXIT] = [];
  }

  getProperty(propertyName: keyof DungeonTileProperties): any {
    return this.properties[propertyName];
  }

  isGridPosition(x: number, y: number) {
    return x === this.gridX && y === this.gridY;
  }

  setObjects(objects: DungeonObject[]) {
    this.objects = objects;
  }

  getObject(name: string) {
    return this.objects.find(object => object.name === name);
  }

  hasObject(name: string) {
    return this.objects.some(object => object.name === name);
  }

  addObject(dungeonObject: DungeonObject) {
    this.objects.push(dungeonObject);
  }

  removeObject(name: string) {
    const dungeonObjectIndex = this.objects.findIndex(dungeonObject => dungeonObject.name === name);
    const [dungeonObject] = this.objects.splice(dungeonObjectIndex, 1);
    dungeonObject.destroy();
  }

  addBehavior(type: DungeonTileBehaviorType, behavior: DungeonBehavior) {
    this.behaviors[type].push(behavior);
  }

  removeBehavior(type: DungeonTileBehaviorType, targetBehavior: DungeonBehavior) {
    const behaviors = this.behaviors[type];

    const behaviorIndex = behaviors.findIndex(behavior => behavior.id == targetBehavior.id);
    behaviors.splice(behaviorIndex, 1);
  }

  runBehaviors(type: DungeonTileBehaviorType, direction: Direction) {
    const behaviors = this.behaviors[type];
    const sortedBehaviors = behaviors.slice().sort((a, b) => b.priority - a.priority);

    for (let behavior of sortedBehaviors) {
      const stopPropagation = behavior.run(direction)

      if (stopPropagation) break;
    };
  }
}
