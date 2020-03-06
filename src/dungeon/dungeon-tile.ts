type DungeonTileProperties = {
  walkable: boolean;
};

export class DungeonTile {
  constructor(
    private x: number,
    private y: number,
    private properties: DungeonTileProperties
  ) {

  }

  isWalkable() {
    return this.properties.walkable;
  }

  isPosition(x: number, y: number) {
    return x === this.x && y === this.y;
  }

  runStatEffects() {

  }

  runMovementEffects() {

  }
}