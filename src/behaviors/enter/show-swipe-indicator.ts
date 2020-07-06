import { Direction } from "../../constants/directions";
import { objectsList } from '../../dungeon/objects/objects-list';
import { GridObjectFactory } from '../../grid-maps/grid-object-factory';
import { DungeonScene } from '../../scenes/dungeon-scene';
import { GridTileBehavior } from '../../grid-maps/grid-tile-behavior';

export class ShowSwipeIndicatorBehavior extends GridTileBehavior {
  public priority: number = 100;

  public isApplicable(): boolean {
    const cursor = this.tile.gridMap.getCursor(this.tile.gridX, this.tile.gridY);

    return cursor.getCardinalNeighbors()
                 .some(({ gridTile }) => gridTile.getProperty('objective'));
  }

  public run(scene: DungeonScene, direction: Direction): boolean {
    const cursor = this.tile.gridMap.getCursor(this.tile.gridX, this.tile.gridY);

    let objectiveDirection: Direction | undefined;
    cursor.getCardinalNeighbors().forEach(({ gridTile, direction }) => {
      if (gridTile.getProperty('objective')) {
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

    const objectFactory = new GridObjectFactory(scene, objectsList);
    const swipeIndicatorDungeonObject = objectFactory.createByName(this.tile, 'swipe-indicator');

    swipeIndicatorDungeonObject.sprite
      .setPosition(this.tile.worldX + xOffset, this.tile.worldY + yOffset)
      .setOrigin(0.5)
      .setRotation(rotation);

    this.tile.addObject(swipeIndicatorDungeonObject);

    return false;
  }
}
