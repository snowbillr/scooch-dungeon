import { Direction } from "../constants/directions";
import { Entity } from "phecs/dist/entity";
import { Dungeon } from "./dungeon";
import { GridPositionComponent } from "../components/grid-position-component";
import { StateMachineComponent } from "../components/state-machine-component";
import { SpriteComponent } from "../components/sprite-component";

export enum EnterEffectTypes {
  CONTINUE_MOVEMENT = 'CONTINUE_MOVEMENT'
}

export type EnterEffect = (direction: Direction, hero: Entity, dungeon: Dungeon, scene: Phaser.Scene) => void;

export const EnterEffects: Record<EnterEffectTypes, EnterEffect> = {
  CONTINUE_MOVEMENT: (direction, hero, dungeon, scene) => {
    const heroStateMachine = hero.getComponent(StateMachineComponent).stateMachine;
    const heroGridPosition = hero.getComponent(GridPositionComponent);
    const neighborTile = dungeon.getWalkableNeighborTile(heroGridPosition.gridX, heroGridPosition.gridY, direction);

    if (!neighborTile) return;

    const neighborWorldPosition = dungeon.getTileWorldPosition(neighborTile.x, neighborTile.y);

    scene.tweens.add({
      targets: hero.getComponent(SpriteComponent).sprite,
      props: {
        x: neighborWorldPosition.x,
        y: neighborWorldPosition.y
      },
      duration: 200,
      onStart: () => heroStateMachine.doTransition({ to: 'moving' }),
      onComplete: () => {
        heroGridPosition.setGridPosition(neighborTile.x, neighborTile.y);
        heroStateMachine.doTransition({ to: 'idle' });

        neighborTile.onEnterEffect?.(direction, hero, dungeon, scene);
      }
    });
  }
}