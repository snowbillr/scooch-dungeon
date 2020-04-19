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
        hero.getComponent(StateMachineComponent).stateMachine.doTransition({
          to: 'moving',
          onTransition(hero: Entity) {
            const sprite = hero.getComponent(SpriteComponent).sprite;

            if (direction === Direction.LEFT) {
              sprite.flipX = true;
            } else if (direction === Direction.RIGHT) {
              sprite.flipX = false;
            }
          }
        });
      },

      onComplete() {
        hero.getComponent(StateMachineComponent).stateMachine.doTransition({ to: 'idle' });
      }
    });

    while(canMove) {
      const nextTile = dungeon.getWalkableNeighborTile(plannerPosition.x, plannerPosition.y, direction);

      if (nextTile) {
        const nextTileWorldPosition = new Phaser.Math.Vector2(nextTile.worldX, nextTile.worldY);

        timeline.add({
          targets: heroSprite,
          props: {
            x: nextTileWorldPosition.x,
            y: nextTileWorldPosition.y
          },
          duration: 200,
          onComplete() {
            heroGridPosition.setGridPosition(nextTile.gridX, nextTile.gridY);
            if (!dungeon.hasNeighborTile(nextTile.gridX, nextTile.gridY, Direction.DOWN)) {
              scene.tweens.killTweensOf(dungeon.getDungeonLayer('wallsDown'))
              scene.tweens.add({
                targets: dungeon.getDungeonLayer('wallsDown'),
                props: {
                  alpha: 0.5
                },
                duration: 100
              });
            } else {
              scene.tweens.killTweensOf(dungeon.getDungeonLayer('wallsDown'))
              scene.tweens.add({
                targets: dungeon.getDungeonLayer('wallsDown'),
                props: {
                  alpha: 1
                },
                duration: 100
              });
            }
          }
        });

        plannerPosition.set(nextTile.gridX, nextTile.gridY);
      } else {
        canMove = false;
      }
    }

    return timeline;
  }
}