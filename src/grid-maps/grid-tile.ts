import { Direction } from '../constants/directions';
import { ScoochDungeonScene } from '../scenes/scooch-dungeon-scene';
import { DungeonBehavior } from '../behaviors/dungeon-behavior';
import { GridObject } from './grid-object';

export type GridTileProperties = {
  walkable: boolean;
};

export enum GridTileBehaviorType {
  INPUT = 'INPUT',
  ENTER = 'ENTER',
  EXIT = 'EXIT'
};

export class GridTile {
  public behaviors: Record<GridTileBehaviorType, DungeonBehavior[]>;
  private objects: GridObject[];

  constructor(
    public readonly scene: ScoochDungeonScene,
    public readonly gridX: number,
    public readonly gridY: number,
    public readonly worldX: number,
    public readonly worldY: number,
    private properties: GridTileProperties
  ) {
    this.behaviors = {
      [GridTileBehaviorType.INPUT]: [],
      [GridTileBehaviorType.ENTER]: [],
      [GridTileBehaviorType.EXIT]: [],
    };

    this.objects = [];
  }

  destroy() {
    delete this.properties;

    this.objects.forEach(object => object.destroy());

    this.behaviors[GridTileBehaviorType.INPUT] = [];
    this.behaviors[GridTileBehaviorType.ENTER] = [];
    this.behaviors[GridTileBehaviorType.EXIT] = [];
  }

  isWalkable() {
    return this.properties.walkable;
  }

  /*
  isObjective() {
    return this.properties.objective;
  }
  */

  isGridPosition(x: number, y: number) {
    return x === this.gridX && y === this.gridY;
  }

  setObjects(objects: GridObject[]) {
    this.objects = objects;
  }

  getObject(name: string) {
    return this.objects.find(object => object.name === name);
  }

  hasObject(name: string) {
    return this.objects.some(object => object.name === name);
  }

  addObject(dungeonObject: GridObject) {
    this.objects.push(dungeonObject);
  }

  removeObject(name: string) {
    const dungeonObjectIndex = this.objects.findIndex(dungeonObject => dungeonObject.name === name);
    const [dungeonObject] = this.objects.splice(dungeonObjectIndex, 1);
    dungeonObject.destroy();
  }

  addBehavior(type: GridTileBehaviorType, behavior: DungeonBehavior) {
    this.behaviors[type].push(behavior);
  }

  removeBehavior(type: GridTileBehaviorType, targetBehavior: DungeonBehavior) {
    const behaviors = this.behaviors[type];

    const behaviorIndex = behaviors.findIndex(behavior => behavior.id == targetBehavior.id);
    behaviors.splice(behaviorIndex, 1);
  }

  runBehaviors(type: GridTileBehaviorType, direction: Direction) {
    const behaviors = this.behaviors[type];
    const sortedBehaviors = behaviors.slice().sort((a, b) => b.priority - a.priority);

    for (let behavior of sortedBehaviors) {
      const stopPropagation = behavior.run(direction)

      if (stopPropagation) break;
    };
  }
}
