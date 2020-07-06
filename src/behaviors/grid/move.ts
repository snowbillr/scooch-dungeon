import { MovementPlanner } from "../../dungeon/movement-planner";
import { Direction } from "../../constants/directions";
import { GridTileBehavior } from './grid-tile-behavior';
import { LevelSelectScene } from '../../scenes/level-select-scene';

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
