import { Direction } from "../../constants/directions";
import { DungeonBehavior } from '../dungeon-behavior';
import { DungeonScene } from '../../scenes/dungeon-scene';

export class RemoveSwipeIndicatorBehavior extends DungeonBehavior {
  public priority: number = 100;

  public isApplicable(): boolean {
    const cursor = this.tile.gridMap.getCursor(this.tile.gridX, this.tile.gridY);

    return cursor.getCardinalNeighbors()
      .some(({ gridTile }) => gridTile.getProperty('objective'));
  }

  public run(scene: DungeonScene, direction: Direction): boolean {
    this.tile.removeObject('swipe-indicator');

    return false;
  }

}
