import { DungeonTile } from "./dungeon-tile";
import { Direction } from "../constants/directions";

export class Dungeon {
  constructor(private dungeonTiles: DungeonTile[]) {
  }

  public moveHero(direction: Direction) {
    // get tile in given direction
    // if it is walkable
    //  tween the hero to that tile

    switch (direction) {
      case Direction.UP:
        console.log('up')
        break;
      case Direction.DOWN:
        console.log('down')
        break;
      case Direction.LEFT:
        console.log('left')
        break;
      case Direction.RIGHT:
        console.log('right')
        break;
    }
  }

  private getWalkableNeighborTile(x: number, y: number, direction: Direction) {
    this.dungeonTiles.filter(tile => tile.isWalkable())
  }
}