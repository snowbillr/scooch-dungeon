import { DungeonTile, DungeonTileBehavior } from "../../dungeon/dungeon-tile";
import { Dungeon } from "../../dungeon/dungeon";
import { Direction } from "../../constants/directions";
import { DungeonScene } from "../../scenes/dungeon-scene";

export const RemoveSwipeIndicatorBehavior: DungeonTileBehavior = {
  priority: 100,

  isApplicable(dungeonTile: DungeonTile, dungeon: Dungeon) {
    const cursor = dungeon.getCursor(dungeonTile.gridX, dungeonTile.gridY);

    return cursor.getCardinalNeighbors()
      .some(({ dungeonTile }) => dungeonTile.isObjective());
  },

  run(direction: Direction, dungeonTile: DungeonTile, scene: DungeonScene) {
    dungeonTile.removeObject('swipe-indicator');
  }
};