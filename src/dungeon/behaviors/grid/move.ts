import { MovementPlanner } from "../../movement-planner";
import { Direction } from "../../../constants/directions";
import { LevelSelectScene } from '../../../scenes/level-select-scene';
import { GridTileBehavior } from '../../../grid-maps/grid-tile-behavior';

export class MoveBehavior extends GridTileBehavior {
  public priority: number = 90;

  isApplicable() {
    return this.tile.getProperty('walkable');
  }

  public run(scene: LevelSelectScene, direction: Direction): boolean {
    const movementTimeline = MovementPlanner.buildMovementTimeline(
      scene,
      scene.hero,
      this.tile.gridMap,
      direction
    );
    movementTimeline.play();

    return false;
  }

}
