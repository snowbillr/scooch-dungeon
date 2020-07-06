import { MovementPlanner } from "../../movement-planner";
import { Direction } from "../../../constants/directions";
import { StateMachineComponent } from '../../../components/state-machine-component';
import { DungeonScene } from '../../../scenes/dungeon-scene';
import { GridTileBehavior } from '../../../grid-maps/grid-tile-behavior';

export class MoveBehavior extends GridTileBehavior {
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
