import { MovementPlanner } from "../../dungeon/movement-planner";
import { Direction } from "../../constants/directions";
import { DungeonBehavior } from '../dungeon-behavior';

export class MoveBehavior extends DungeonBehavior {
  public priority: number = 90;

  isApplicable() {
    return this.tile.isWalkable();
  }

  public run(direction: Direction): boolean {
    this.dungeon.stats.incrementMoves();

    const movementTimeline = MovementPlanner.buildMovementTimeline(this.scene.hero, direction, this.scene);
    movementTimeline.play();

    return false;
  }

}
