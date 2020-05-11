import { DungeonObject } from './dungeon-object';
import { Direction } from '../constants/directions';
import { Dungeon } from './dungeon';
import { DungeonScene } from '../scenes/dungeon-scene';
import { DungeonObjectFactory } from './dungeon-object-factory';

export type DungeonTileProperties = {
  walkable: boolean;
  objective: boolean;
};

export type DungeonTileBehavior = {
  priority: number;

  isApplicable: (dungeonTile: DungeonTile, dungeon: Dungeon) => boolean;
  run: (direction: Direction, dungeonTile: DungeonTile, scene: DungeonScene) => boolean | void;
};

export class DungeonTile {
  public inputBehaviors: DungeonTileBehavior[];
  public enterBehaviors: DungeonTileBehavior[];
  public exitBehaviors: DungeonTileBehavior[];

  constructor(
    public readonly gridX: number,
    public readonly gridY: number,
    public readonly worldX: number,
    public readonly worldY: number,
    private properties: DungeonTileProperties,
    private objects: DungeonObject[]
  ) {
    this.inputBehaviors = [];
    this.enterBehaviors = [];
    this.exitBehaviors = [];
  }

  destroy() {
    delete this.properties;

    this.objects.forEach(object => object.destroy());

    this.inputBehaviors = [];
    delete this.inputBehaviors;

    this.enterBehaviors = [];
    delete this.enterBehaviors;

    this.exitBehaviors = [];
    delete this.exitBehaviors;
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

  addInputBehavior(behavior: DungeonTileBehavior) {
    this.inputBehaviors.push(behavior);
  }

  addEnterBehavior(behavior: DungeonTileBehavior) {
    this.enterBehaviors.push(behavior);
  }

  addExitBehavior(behavior: DungeonTileBehavior) {
    this.exitBehaviors.push(behavior);
  }

  removeEnterBehavior(behavior: DungeonTileBehavior) {
    const behaviorIndex = this.enterBehaviors.findIndex(enterBehavior => enterBehavior ==  behavior);
    this.enterBehaviors.splice(behaviorIndex, 1);
  }

  runInputBehaviors(direction: Direction, scene: DungeonScene) {
    this.runBehaviors(this.inputBehaviors, direction, scene);
  }

  runEnterBehaviors(direction: Direction, scene: DungeonScene) {
    this.runBehaviors(this.enterBehaviors, direction, scene);
  }

  runExitBehaviors(direction: Direction, scene: DungeonScene) {
    this.runBehaviors(this.exitBehaviors, direction, scene);
  }

  runBehaviors(behaviors: DungeonTileBehavior[], direction: Direction, scene: DungeonScene) {
    const sortedBehaviors = behaviors.slice().sort((a, b) => b.priority - a.priority);

    for (let behavior of sortedBehaviors) {
      const stopPropagation = behavior.run(direction, this, scene)

      if (stopPropagation) break;
    };
  }
}