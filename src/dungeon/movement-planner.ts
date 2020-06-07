import { Direction } from "../constants/directions";
import { Dungeon } from "./dungeon";
import { Entity } from "phecs/dist/entity";
import { SpriteComponent } from "../components/sprite-component";
import { GridPositionComponent } from "../components/grid-position-component";
import { StateMachineComponent } from "../components/state-machine-component";
import { DungeonScene } from "../scenes/dungeon-scene";
import { DungeonTileBehaviorType } from "./dungeon-tile";
import { CallbackQueue } from '../lib/callback-queue';

export const MovementPlanner = {
  buildMovementTimeline(hero: Entity, direction: Direction, scene: DungeonScene) {
    const heroSprite = hero.getComponent(SpriteComponent).sprite;
    const heroGridPosition = hero.getComponent(GridPositionComponent);
    const plannerPosition = new Phaser.Math.Vector2(heroGridPosition.gridX, heroGridPosition.gridY);
    let canMove = scene.dungeon.getCursor(plannerPosition.x, plannerPosition.y).move(direction);

    // https://codepen.io/snowbillr/pen/vYNaEJd?editors=1111
    // Phaser doesn't reliably call timeline tween's callbacks in order.
    // This utility class enforces callback order in tandem with the timeline.
    const callbackQueue = new CallbackQueue();

    const timeline = scene.tweens.timeline({
      // Setting the `tweens` array go an empty tween because the timeline won't set the onStart and
      // onComplete if the tweens array is empty. Also need to set `paused` to true explicitly.
      tweens: [{targets: [], duration: 0}],
      paused: true,
      onStart() {
        callbackQueue.runNext();
      },

      onComplete() {
        callbackQueue.runNext();
      }
    });

    // timeline onStart
    callbackQueue.addCallback(() => {
      hero.getComponent(StateMachineComponent).stateMachine.transitionTo('moving', undefined, { direction });
    });

    while(canMove) {
      const currentTile = scene.dungeon.getTile(plannerPosition.x, plannerPosition.y);
      const nextTile = scene.dungeon.getWalkableNeighborTile(plannerPosition.x, plannerPosition.y, direction);

      if (nextTile) {
        const nextTileWorldPosition = new Phaser.Math.Vector2(nextTile.worldX, nextTile.worldY);

        timeline.add({
          targets: heroSprite,
          props: {
            x: nextTileWorldPosition.x,
            y: nextTileWorldPosition.y
          },
          duration: 200,
          onStart() {
            callbackQueue.runNext();
          },
          onComplete() {
            callbackQueue.runNext();
          }
        });

        // tween onStart
        callbackQueue.addCallback(() => {
          currentTile.runBehaviors(DungeonTileBehaviorType.EXIT, direction);
        });

        // tween onComplete
        callbackQueue.addCallback(() => {
          heroGridPosition.setGridPosition(nextTile.gridX, nextTile.gridY);
          nextTile.runBehaviors(DungeonTileBehaviorType.ENTER, direction);
        });

        plannerPosition.set(nextTile.gridX, nextTile.gridY);
      } else {
        canMove = false;
      }
    }

    // timeline onComplete
    callbackQueue.addCallback(() => {
      if (scene.queuedInput.length) {
        scene.incrementCombo();
        scene.handleInput();
        hero.getComponent(StateMachineComponent).stateMachine.transitionTo('moving', undefined, { direction: scene.queuedInput });
      } else {
        scene.resetCombo();
        hero.getComponent(StateMachineComponent).stateMachine.transitionTo('idle');
      }
    });

    return timeline;
  }
}
