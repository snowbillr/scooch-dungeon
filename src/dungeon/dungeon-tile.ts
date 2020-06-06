import { DungeonObject } from './dungeon-object';
import { Direction } from '../constants/directions';
import { Dungeon } from './dungeon';
import { DungeonScene } from '../scenes/dungeon-scene';
import { ScoochDungeonScene } from '../scenes/scooch-dungeon-scene';

export type DungeonTileProperties = {
  walkable: boolean;
  objective: boolean;
};

export enum DungeonTileBehaviorType {
  INPUT = 'INPUT',
  ENTER = 'ENTER',
  EXIT = 'EXIT'
};

export type DungeonTileBehavior = {
  priority: number;

  isApplicable: (dungeonTile: DungeonTile, dungeon: Dungeon) => boolean;
  run: (direction: Direction, dungeonTile: DungeonTile, scene: DungeonScene) => boolean | void;
};

export class DungeonTile {
  public behaviors: Record<DungeonTileBehaviorType, DungeonTileBehavior[]>;
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

  setObjects(objects: DungeonObject[]) {
    this.objects = objects;
  }

  destroy() {
    delete this.properties;

    this.objects.forEach(object => object.destroy());

    this.behaviors[DungeonTileBehaviorType.INPUT] = [];
    this.behaviors[DungeonTileBehaviorType.ENTER] = [];
    this.behaviors[DungeonTileBehaviorType.EXIT] = [];
  }

  isWalkable() {
    return this.properties.walkable;
  }

  isObjective() {
    return this.properties.objective;
  }

  isGridPosition(x: number, y: number) {
    return x === this.gridX && y === this.gridY;
  }

  getObject(name: string) {
    return this.objects.find(object => object.name === name);
  }

  addObject(dungeonObject: DungeonObject) {
    this.objects.push(dungeonObject);
  }

  removeObject(name: string) {
    const dungeonObjectIndex = this.objects.findIndex(dungeonObject => dungeonObject.name === name);
    const [dungeonObject] = this.objects.splice(dungeonObjectIndex, 1);
    dungeonObject.destroy();
  }

  addBehavior(type: DungeonTileBehaviorType, behavior: DungeonTileBehavior) {
    this.behaviors[type].push(behavior);
  }

  removeBehavior(type: DungeonTileBehaviorType, targetBehavior: DungeonTileBehavior) {
    const behaviors = this.behaviors[type];

    const behaviorIndex = behaviors.findIndex(behavior => behavior == targetBehavior);
    behaviors.splice(behaviorIndex, 1);
  }

  runBehaviors(type: DungeonTileBehaviorType, direction: Direction, scene: DungeonScene) {
    const behaviors = this.behaviors[type];
    const sortedBehaviors = behaviors.slice().sort((a, b) => b.priority - a.priority);

    for (let behavior of sortedBehaviors) {
      const stopPropagation = behavior.run(direction, this, scene)

      if (stopPropagation) break;
    };
  }
}
