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

    let objectiveDirection: Direction | undefined;
    cursor.getCardinalNeighbors().forEach(({ dungeonTile, direction }) => {
      if (dungeonTile.isObjective()) {
        objectiveDirection = direction;
      }
    });

    if (!objectiveDirection) throw new Error('EnterBehavior - ShowSwipeIndicator - no objective neighbor found');

    const rotation = {
      [Direction.DOWN]: 0,
      [Direction.LEFT]: Math.PI / 2,
      [Direction.UP]: Math.PI,
      [Direction.RIGHT]: Math.PI + Math.PI / 2,
    }[objectiveDirection];

    const tileWidth = 32;
    const xOffset = {
      [Direction.DOWN]: tileWidth / 2,
      [Direction.LEFT]: 0,
      [Direction.UP]: tileWidth / 2,
      [Direction.RIGHT]: tileWidth,
    }[objectiveDirection];

    const yOffset = {
      [Direction.DOWN]: tileWidth,
      [Direction.LEFT]: tileWidth / 2,
      [Direction.UP]: 0,
      [Direction.RIGHT]: tileWidth / 2,
    }[objectiveDirection];

    const objectFactory = new DungeonObjectFactory(scene);
    const swipeIndicatorDungeonObject = objectFactory.createByName(dungeonTile, 'swipe-indicator');

    // TODO get half the tile width/height in a better way
    swipeIndicatorDungeonObject.sprite
      .setPosition(dungeonTile.worldX + xOffset, dungeonTile.worldY + yOffset)
      .setOrigin(0.5)
      .setRotation(rotation);

    dungeonTile.addObject(swipeIndicatorDungeonObject);
  }
}
