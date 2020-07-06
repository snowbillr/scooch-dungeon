import { Direction } from '../constants/directions';
import { GridObject } from './grid-object';
import { GridMap } from './grid-map';
import { GridTileBehavior } from './grid-tile-behavior';

export type GridTileProperties = Record<string, any>;
export type GridTilePropertiesComputer = (rawProperties: RawProperties) => GridTileProperties;
type RawProperties = Record<string, any[]>;

export enum GridTileBehaviorType {
  INPUT = 'INPUT',
  ENTER = 'ENTER',
  EXIT = 'EXIT'
};

export class GridTile {
  public behaviors: Record<GridTileBehaviorType, GridTileBehavior[]>;
  public gridMap!: GridMap;

  private objects: GridObject[];

  constructor(
    private readonly scene: Phaser.Scene,
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

  setGridMap(gridMap: GridMap) {
    this.gridMap = gridMap;
  }

  destroy() {
    delete this.properties;

    this.objects.forEach(object => object.destroy());

    this.behaviors[GridTileBehaviorType.INPUT] = [];
    this.behaviors[GridTileBehaviorType.ENTER] = [];
    this.behaviors[GridTileBehaviorType.EXIT] = [];
  }

  getProperty<K extends keyof GridTileProperties>(propertyName: K): GridTileProperties[K] {
    return this.properties[propertyName];
  }

  isGridPosition(x: number, y: number) {
    return x === this.gridX && y === this.gridY;
  }

  setObjects(objects: GridObject[]) {
    this.objects = objects;
  }

  getObject(name: string): GridObject | undefined {
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

  addBehavior(type: GridTileBehaviorType, behavior: GridTileBehavior) {
    this.behaviors[type].push(behavior);
  }

  removeBehavior(type: GridTileBehaviorType, targetBehavior: GridTileBehavior) {
    const behaviors = this.behaviors[type];

    const behaviorIndex = behaviors.findIndex(behavior => behavior.id == targetBehavior.id);
    behaviors.splice(behaviorIndex, 1);
  }

  runBehaviors(type: GridTileBehaviorType, direction: Direction) {
    const behaviors = this.behaviors[type];
    const sortedBehaviors = behaviors.slice().sort((a, b) => b.priority - a.priority);

    for (let behavior of sortedBehaviors) {
      const stopPropagation = behavior.run(this.scene, direction)

      if (stopPropagation) break;
    };
  }
}
