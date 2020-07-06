import { Direction } from "../../../constants/directions";
import { DungeonScene } from '../../../scenes/dungeon-scene';
import { GridTileBehavior } from '../../../grid-maps/grid-tile-behavior';

export class RemoveSwipeIndicatorBehavior extends GridTileBehavior {
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
