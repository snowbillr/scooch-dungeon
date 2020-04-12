import { Direction } from "../constants/directions";
import { StateMachineComponent } from "../components/state-machine-component";
import { Entity } from "phecs/dist/entity";
import { SpriteComponent } from "../components/sprite-component";
import { GridPositionComponent } from "../components/grid-position-component";
import { Dungeon } from "./dungeon";

export type DirectionInputEffect = (direction: Direction, hero: Entity, dungeon: Dungeon, scene: Phaser.Scene) => void;

export enum DirectionInputTypes {
  MOVE = 'MOVE'
}

export const DirectionInputEffects: Record<DirectionInputTypes, DirectionInputEffect> = {
  MOVE: (direction, hero, dungeon, scene) => {
    const heroStateMachine = hero.getComponent(StateMachineComponent).stateMachine;
    if (heroStateMachine.currentState.id === 'moving') return;

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
      }
    });
  },
};
