import { Direction } from "../../constants/directions";
import { DungeonBehavior } from '../dungeon-behavior';

export class RemoveSwipeIndicatorBehavior extends DungeonBehavior {
  public priority: number = 100;

  public isApplicable(): boolean {
    const cursor = this.dungeon.getCursor(this.tile.gridX, this.tile.gridY);

    return cursor.getCardinalNeighbors()
      .some(({ dungeonTile }) => dungeonTile.getProperty('objective'));
  }

  public run(direction: Direction): boolean {
    this.tile.removeObject('swipe-indicator');

    return false;
  }

}
