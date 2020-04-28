import { DungeonObject } from './dungeon-object';
import { Entity } from 'phecs/dist/entity';
import { Direction } from '../constants/directions';
import { Dungeon } from './dungeon';
import { DungeonScene } from '../scenes/dungeon-scene';

export type DungeonTileProperties = {
  walkable: boolean;
  objective: boolean;
};

export type DungeonTileBehavior = {
  isApplicable: (dungeonTile: DungeonTile, dungeon: Dungeon) => boolean,
  run: (hero: Entity, direction: Direction, dungeon: Dungeon, dungeonTile: DungeonTile, scene: DungeonScene) => void
};

export class DungeonTile {
  public inputBehaviors: DungeonTileBehavior[];
  // public readonly enterBehaviors: DungeonTileBehavior[];

  constructor(
    public readonly gridX: number,
    public readonly gridY: number,
    public readonly worldX: number,
    public readonly worldY: number,
    private properties: DungeonTileProperties,
    private objects: DungeonObject[]
  ) {
    this.inputBehaviors = [];
  }

  destroy() {
    delete this.properties;

    this.objects.forEach(object => object.destroy());

    this.inputBehaviors = [];
    delete this.inputBehaviors;
  }

  getObject(name: string) {
    return this.objects.find(object => object.name === name);
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

  addInputBehavior(behavior: DungeonTileBehavior) {
    this.inputBehaviors.push(behavior);
  }

  /*
  addEnterBehavior(behavior: DungeonTileBehavior) {
    this.enterBehaviors.push(behavior);
  }
  */
}