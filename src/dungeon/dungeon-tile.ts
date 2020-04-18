type DungeonTileProperties = {
  walkable?: boolean;
};

export class DungeonTile {
  constructor(
    public readonly gridX: number,
    public readonly gridY: number,
    public readonly worldX: number,
    public readonly worldY: number,
    private properties: DungeonTileProperties,
  ) {
  }

  isWalkable() {
    return this.properties.walkable;
  }

  isGridPosition(x: number, y: number) {
    return x === this.gridX && y === this.gridY;
  }
}