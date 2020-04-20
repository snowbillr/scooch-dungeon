export type DungeonTileProperties = {
  walkable?: boolean[];
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
  ) {
    this.enterBehaviors = [];
  }

  isWalkable() {
    return this.properties.walkable;
  }

  isGridPosition(x: number, y: number) {
    return x === this.gridX && y === this.gridY;
  }

  addEnterBehavior(behavior: DungeonTileBehavior) {
    this.enterBehaviors.push(behavior);
  }
}