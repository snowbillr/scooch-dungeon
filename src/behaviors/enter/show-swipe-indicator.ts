import { Direction } from "../../constants/directions";
import { DungeonObjectFactory } from "../../dungeon/dungeon-object-factory";
import { DungeonBehavior } from '../dungeon-behavior';

export class ShowSwipeIndicatorBehavior extends DungeonBehavior {
  public priority: number = 100;

  public isApplicable(): boolean {
    const cursor = this.dungeon.getCursor(this.tile.gridX, this.tile.gridY);

    return cursor.getCardinalNeighbors()
                 .some(({ dungeonTile }) => dungeonTile.isObjective());
  }
  public run(direction: Direction): boolean {
    const cursor = this.scene.dungeon.getCursor(this.tile.gridX, this.tile.gridY);

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

    const objectFactory = new DungeonObjectFactory(this.scene);
    const swipeIndicatorDungeonObject = objectFactory.createByName(this.tile, 'swipe-indicator');

    // TODO get half the tile width/height in a better way
    swipeIndicatorDungeonObject.sprite
      .setPosition(this.tile.worldX + xOffset, this.tile.worldY + yOffset)
      .setOrigin(0.5)
      .setRotation(rotation);

    this.tile.addObject(swipeIndicatorDungeonObject);

    return false;
  }
}
