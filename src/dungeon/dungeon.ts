import { DungeonTile } from "./dungeon-tile";
import { Direction } from "../constants/directions";
import { DungeonMarker } from "./dungeon-marker";

export class Dungeon {
  constructor(
    private dungeonTiles: DungeonTile[],
    private markers: Record<string, DungeonMarker>
  ) {}

  public getMarker(name: string): DungeonMarker {
    return this.markers[name];
  }

  public getTile(x: number, y: number): DungeonTile {
    const tile = this.dungeonTiles
      .filter(tile => tile.isWalkable())
      .find(tile => tile.isGridPosition(x, y));

    if (!tile) throw new Error(`No tile found for ${x}, ${y}`);

    return tile;
  }

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
      .find(tile => tile.isGridPosition(neighborX, neighborY))

    return neighborTile;
  }
}