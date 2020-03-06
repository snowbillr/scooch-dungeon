import { DungeonTile } from "./dungeon-tile";
import { Direction } from "../constants/directions";

export class Dungeon {
  constructor(private dungeonTiles: DungeonTile[]) {
  }

  // this will live in a system somewhere
  public moveHero(direction: Direction) {
    // get tile in given direction
    // if it is walkable
    //  tween the hero to that tile
  }

  private getWalkableNeighborTile(x: number, y: number, direction: Direction): DungeonTile | undefined {
    let neighborCoordinates = new Phaser.Math.Vector2(x, y);
    switch (direction) {
      case Direction.UP:
        neighborCoordinates.add(new Phaser.Math.Vector2(0, -1));
        break;
      case Direction.DOWN:
        neighborCoordinates.add(new Phaser.Math.Vector2(0, 1));
        break;
      case Direction.LEFT:
        neighborCoordinates.add(new Phaser.Math.Vector2(-1, 0));
        break;
      case Direction.RIGHT:
        neighborCoordinates.add(new Phaser.Math.Vector2(1, 0));
        break;
    }
    
    return this.dungeonTiles.filter(tile => tile.isWalkable())
      .find(tile => tile.isPosition(x, y))
  }
}