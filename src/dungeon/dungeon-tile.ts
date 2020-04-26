import { DungeonObject } from './dungeon-object';

export type DungeonTileProperties = {
  walkable: boolean;
  objective: boolean;
};

export type DungeonTileBehavior = () => void;

export class DungeonTile {
  public readonly enterBehaviors: DungeonTileBehavior[];

  constructor(
    public readonly gridX: number,
    public readonly gridY: number,
    public readonly worldX: number,
    public readonly worldY: number,
    private properties: DungeonTileProperties,
    private objects: DungeonObject[]
  ) {
    this.enterBehaviors = [];
  }

  destroy() {
    delete this.properties;
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

  addEnterBehavior(behavior: DungeonTileBehavior) {
    this.enterBehaviors.push(behavior);
  }
}