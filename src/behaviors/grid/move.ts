import { MovementPlanner } from "../../dungeon/movement-planner";
import { Direction } from "../../constants/directions";
import { GridTileBehavior } from './grid-tile-behavior';
import { LevelSelectScene } from '../../scenes/level-select-scene';

export class MoveBehavior extends GridTileBehavior<LevelSelectScene> {
  public priority: number = 90;

  isApplicable() {
    return this.tile.getProperty('walkable');
  }

  public run(direction: Direction): boolean {
    const movementTimeline = MovementPlanner.buildMovementTimeline(
      this.scene,
      this.scene.hero,
      this.scene.gridMap,
      direction
    );
    movementTimeline.play();

    return false;
  }

}
