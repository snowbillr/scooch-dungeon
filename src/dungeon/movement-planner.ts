import { Direction } from "../constants/directions";
import { Dungeon } from "./dungeon";
import { Entity } from "phecs/dist/entity";
import { SpriteComponent } from "../components/sprite-component";
import { GridPositionComponent } from "../components/grid-position-component";
import { StateMachineComponent } from "../components/state-machine-component";

export const MovementPlanner = {
  buildMovementTimeline(hero: Entity, direction: Direction, dungeon: Dungeon, scene: Phaser.Scene) {
    let canMove = true;
    const heroSprite = hero.getComponent(SpriteComponent).sprite;
    const heroGridPosition = hero.getComponent(GridPositionComponent);
    const plannerPosition = new Phaser.Math.Vector2(heroGridPosition.gridX, heroGridPosition.gridY);

    const timeline = scene.tweens.timeline({
      // Setting the `tweens` array go an empty tween because the timeline won't set the onStart and
      // onComplete if the tweens array is empty. Also need to set `paused` to true explicitly.
      tweens: [{targets: [], duration: 0}],
      paused: true,
      onStart() {
        hero.getComponent(StateMachineComponent).stateMachine.doTransition({ to: 'moving' });
      },

      onComplete() {
        hero.getComponent(StateMachineComponent).stateMachine.doTransition({ to: 'idle' });
      }
    });

    while(canMove) {
      const nextTile = dungeon.getWalkableNeighborTile(plannerPosition.x, plannerPosition.y, direction);

      if (nextTile) {
        const nextTileWorldPosition = dungeon.getTileWorldPosition(nextTile.x, nextTile.y);

        timeline.add({
          targets: heroSprite,
          props: {
            x: nextTileWorldPosition.x,
            y: nextTileWorldPosition.y
          },
          duration: 200,
          onComplete() {
            heroGridPosition.setGridPosition(nextTile.x, nextTile.y);
          }
        });

        plannerPosition.set(nextTile.x, nextTile.y);
      } else {
        canMove = false;
      }
    }

    return timeline;
  }
}