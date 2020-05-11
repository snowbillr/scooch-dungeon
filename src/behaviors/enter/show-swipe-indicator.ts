import { DungeonTileBehavior, DungeonTile } from "../../dungeon/dungeon-tile";
import { Dungeon } from "../../dungeon/dungeon";
import { Direction } from "../../constants/directions";
import { DungeonScene } from "../../scenes/dungeon-scene";
import { DungeonObjectFactory } from "../../dungeon/dungeon-object-factory";

export const ShowSwipeIndicatorBehavior: DungeonTileBehavior = {
  priority: 100,

  isApplicable(dungeonTile: DungeonTile, dungeon: Dungeon) {
    const cursor = dungeon.getCursor(dungeonTile.gridX, dungeonTile.gridY);

    return cursor.getCardinalNeighbors()
                 .some(({ dungeonTile }) => dungeonTile.isObjective());
  },

  run(direction: Direction, dungeonTile: DungeonTile, scene: DungeonScene) {
    const cursor = scene.dungeon.getCursor(dungeonTile.gridX, dungeonTile.gridY);

    let objectiveTile: DungeonTile | undefined;
    let objectiveDirection: Direction | undefined;
    cursor.getCardinalNeighbors().forEach(({ dungeonTile, direction }) => {
      if (dungeonTile.isObjective()) {
        objectiveTile = dungeonTile;
        objectiveDirection = direction;
      }
    });

    if (!objectiveTile || !objectiveDirection) throw new Error('EnterBehavior - ShowSwipeIndicator - no objective neighbor found');

    const rotation = {
      [Direction.DOWN]: 0,
      [Direction.LEFT]: Math.PI / 2,
      [Direction.UP]: Math.PI,
      [Direction.RIGHT]: Math.PI + Math.PI / 2,
    }[objectiveDirection];

    const objectFactory = new DungeonObjectFactory(scene);
    const swipeIndicatorDungeonObject = objectFactory.createByName(objectiveTile.worldX, objectiveTile.worldY, 'swipe-indicator');

    // TODO get half the tile width/height in a better way
    swipeIndicatorDungeonObject.sprite
      .setPosition(objectiveTile.worldX + 16, objectiveTile.worldY + 16)
      .setOrigin(0.5)
      .setRotation(rotation);

    objectiveTile.addObject(swipeIndicatorDungeonObject);
  }
}