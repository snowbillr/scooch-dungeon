import { MovementPlanner } from "../../../dungeon/movement-planner";
import { Direction } from "../../../constants/directions";
import { OverworldScene } from '../../../scenes/overworld-scene';
import { GridTileBehavior } from '../../../grid-maps/grid-tile-behavior';
import { SpriteComponent } from '../../../components/sprite-component';
import { StateMachineComponent } from '../../../components/state-machine-component';

export class MoveBehavior extends GridTileBehavior {
  public priority: number = 90;

  isApplicable() {
    return this.tile.getProperty('walkable');
  }

  public run(scene: OverworldScene, direction: Direction): boolean {
    const movementTimeline = MovementPlanner.buildMovementTimeline(
      scene,
      scene.hero,
      this.tile.gridMap,
      direction,
      () => {
        scene.hero.getComponent(StateMachineComponent).stateMachine.transitionTo('idle')
      }
    );
    movementTimeline.play();

    return false;
  }

}
