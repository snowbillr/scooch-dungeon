import { DungeonTile, DungeonTileBehavior } from "../../dungeon/dungeon-tile";
import { Dungeon } from "../../dungeon/dungeon";
import { Direction, OppositeDirection } from "../../constants/directions";
import { DungeonScene } from "../../scenes/dungeon-scene";

export const RemoveArrowBehavior: DungeonTileBehavior = {
  priority: 100,

  isApplicable(dungeonTile: DungeonTile, dungeon: Dungeon) {
    const cursor = dungeon.getCursor(dungeonTile.gridX, dungeonTile.gridY);

    let applicable = false;

    if (cursor.up()) {
      applicable = applicable || cursor.getTile().isObjective();
    }

    cursor.reset();
    if (cursor.right()) {
      applicable = applicable || cursor.getTile().isObjective();
    }

    cursor.reset();
    if (cursor.down()) {
      applicable = applicable || cursor.getTile().isObjective();
    }

    cursor.reset();
    if (cursor.left()) {
      applicable = applicable || cursor.getTile().isObjective();
    }

    return applicable;
  },

  run(direction: Direction, dungeonTile: DungeonTile, scene: DungeonScene) {
    const cursor = scene.dungeon.getCursor(dungeonTile.gridX, dungeonTile.gridY);

    let objectiveTile;
    if (cursor.up() && cursor.getTile().isObjective()) {
      objectiveTile = cursor.getTile();
    }
    cursor.reset();
    if (cursor.down() && cursor.getTile().isObjective()) {
      objectiveTile = cursor.getTile();
    }
    cursor.reset();
    if (cursor.left() && cursor.getTile().isObjective()) {
      objectiveTile = cursor.getTile();
    }
    cursor.reset();
    if (cursor.right() && cursor.getTile().isObjective()) {
      objectiveTile = cursor.getTile();
    }

    // find objective tile around it, then remove the arrow. opposite direction doesn't work
    // cursor.move(OppositeDirection(direction));
    // const objectiveTile = cursor.getTile();

    if (!objectiveTile) throw new Error('ExitBehavior - RemoveArrow - no objective neighbor found');

    objectiveTile.removeObject('arrow');
  }
};