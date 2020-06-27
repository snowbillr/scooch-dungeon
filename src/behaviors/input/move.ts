import { MovementPlanner } from "../../dungeon/movement-planner";
import { Direction } from "../../constants/directions";
import { DungeonBehavior } from '../dungeon-behavior';
import { StateMachineComponent } from '../../components/state-machine-component';

export class MoveBehavior extends DungeonBehavior {
  public priority: number = 90;

  isApplicable() {
    return this.tile.isWalkable();
  }

  public run(direction: Direction): boolean {
    this.dungeon.stats.incrementMoves();

    const movementTimeline = MovementPlanner.buildMovementTimeline(this.scene, this.scene.hero, this.scene.dungeon, direction, () => {
      if (this.scene.queuedInput.length) {
        this.scene.incrementCombo();
        this.scene.handleInput();
        this.scene.hero.getComponent(StateMachineComponent)
          .stateMachine.transitionTo('moving', undefined, { direction: this.scene.queuedInput });
      } else {
        this.scene.resetCombo();
        this.scene.hero.getComponent(StateMachineComponent).stateMachine.transitionTo('idle');
      }
    });
    movementTimeline.play();

    return false;
  }

}
