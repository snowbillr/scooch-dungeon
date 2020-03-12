import { DungeonTile } from "./dungeon-tile";
import { Direction } from "../constants/directions";

export class Dungeon {
  constructor(
    private dungeonTiles: DungeonTile[]
  ) {}

  public getWalkableNeighborTile(x: number, y: number, direction: Direction): DungeonTile | undefined {
    let neighborX = x;
    let neighborY = y;
    switch (direction) {
      case Direction.UP:
        neighborY -= 1;
        break;
      case Direction.DOWN:
        neighborY += 1;
        break;
      case Direction.LEFT:
        neighborX -= 1;
        break;
      case Direction.RIGHT:
        neighborX += 1;
        break;
    }
    
    const neighborTile = this.dungeonTiles
      .filter(tile => tile.isWalkable())
      .find(tile => tile.isPosition(neighborX, neighborY))

    return neighborTile;
  }
}