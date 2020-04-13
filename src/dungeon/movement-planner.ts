import { Direction } from "../constants/directions";
import { DungeonTile } from "./dungeon-tile";
import { Dungeon } from "./dungeon";
import { Entity } from "phecs/dist/entity";
import { SpriteComponent } from "../components/sprite-component";
import { GridPositionComponent } from "../components/grid-position-component";

export const MovementPlanner = {
  buildMovementTimeline(hero: Entity, direction: Direction, startingTile: DungeonTile, dungeon: Dungeon, scene: Phaser.Scene) {
    let canMove = true;
    const timeline = scene.tweens.timeline();
    const heroSprite = hero.getComponent(SpriteComponent).sprite;
    const heroGridPosition = hero.getComponent(GridPositionComponent);

    const plannerPosition = new Phaser.Math.Vector2(heroGridPosition.gridX, heroGridPosition.gridY);

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