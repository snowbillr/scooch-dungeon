import { DungeonTileBehavior, DungeonTile } from "../../dungeon/dungeon-tile";
import { Dungeon } from "../../dungeon/dungeon";
import { Direction } from "../../constants/directions";
import { DungeonScene } from "../../scenes/dungeon-scene";
import { DungeonObjectFactory } from "../../dungeon/dungeon-object-factory";

export const ShowArrowBehavior: DungeonTileBehavior = {
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
    let objectiveDirection;
    if (cursor.up() && cursor.getTile().isObjective()) {
      objectiveTile = cursor.getTile();
      objectiveDirection = Direction.UP;
    }
    cursor.reset();
    if (cursor.down() && cursor.getTile().isObjective()) {
      objectiveTile = cursor.getTile();
      objectiveDirection = Direction.DOWN;
    }
    cursor.reset();
    if (cursor.left() && cursor.getTile().isObjective()) {
      objectiveTile = cursor.getTile();
      objectiveDirection = Direction.LEFT;
    }
    cursor.reset();
    if (cursor.right() && cursor.getTile().isObjective()) {
      objectiveTile = cursor.getTile();
      objectiveDirection = Direction.RIGHT;
    }
    if (!objectiveTile || !objectiveDirection) throw new Error('EnterBehavior - ShowArrow - no objective neighbor found');

    const rotation = {
      [Direction.DOWN]: 0,
      [Direction.LEFT]: Math.PI / 2,
      [Direction.UP]: Math.PI,
      [Direction.RIGHT]: Math.PI + Math.PI / 2,
    }[objectiveDirection];

    const objectFactory = new DungeonObjectFactory(scene);
    const arrowDungeonObject = objectFactory.createByName(objectiveTile.worldX, objectiveTile.worldY, 'arrow');

    // TODO get half the tile width/height in a better way
    arrowDungeonObject.sprite
      .setPosition(objectiveTile.worldX + 16, objectiveTile.worldY + 16)
      .setOrigin(0.5)
      .setRotation(rotation);

    objectiveTile.addObject(arrowDungeonObject);
  }
}