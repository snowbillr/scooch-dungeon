import { MovementPlanner } from "../../dungeon/movement-planner";
import { Direction } from "../../constants/directions";
import { DungeonBehavior } from '../dungeon-behavior';
import { StateMachineComponent } from '../../components/state-machine-component';
import { DungeonScene } from '../../scenes/dungeon-scene';

export class MoveBehavior extends DungeonBehavior {
  public priority: number = 90;

  isApplicable() {
    return this.tile.getProperty('walkable');
  }

  public run(scene: DungeonScene, direction: Direction): boolean {
    scene.dungeon.stats.incrementMoves();

    const movementTimeline = MovementPlanner.buildMovementTimeline(scene, scene.hero, this.tile.gridMap, direction, () => {
      if (scene.queuedInput.length) {
        scene.incrementCombo();
        scene.handleInput();
        scene.hero.getComponent(StateMachineComponent)
          .stateMachine.transitionTo('moving', undefined, { direction: scene.queuedInput });
      } else {
        scene.resetCombo();
        scene.hero.getComponent(StateMachineComponent).stateMachine.transitionTo('idle');
      }
    });
    movementTimeline.play();

    return false;
  }

}
