import { SpriteComponent } from "../../components/sprite-component";
import { Depths } from "../../constants/depths";
import { GridPositionComponent } from "../../components/grid-position-component";
import { StateMachineComponent } from "../../components/state-machine-component";
import { Prefab } from "phecs/dist/entity-manager";
import { Entity } from "phecs/dist/entity";
import { State, Transition } from 'phinite-state-machine';
import { TriggerActivator } from 'phinite-state-machine/dist/transition';
import { DungeonScene } from '../../scenes/dungeon-scene';
import { Direction } from '../../constants/directions';


/*
class SwipeMovementTransition extends Transition<Entity, DungeonScene> {
  constructor(to: string) {
    super(to);
  }

  registerTrigger(activateTrigger: TriggerActivator, scene: DungeonScene) {
    const handleSwipe = (direction: Direction) => {
      activateTrigger({ direction });
    }

    scene.swipe.addListener(handleSwipe);

    return () => scene.swipe.removeListener(handleSwipe);
  }
}
*/

export const heroStates: State<Entity>[] = [
  new State('idle', [], {
    onEnter(hero, scene: DungeonScene) {
      const dungeonScene = scene as DungeonScene;

      if (dungeonScene.queuedInput) {

        dungeonScene.handleInput(dungeonScene.queuedInput);
        hero.getComponent(StateMachineComponent).stateMachine.transitionTo('moving', undefined, { direction: dungeonScene.queuedInput });

        dungeonScene.queuedInput = undefined;
      } else {
        hero.getComponent(SpriteComponent).sprite.anims.play('hero-idle');
      }
    }
  }),
  new State('moving', [], {
    onEnter(hero, scene, transitionData: any) {
      const sprite = hero.getComponent(SpriteComponent).sprite;

      if (transitionData.direction === Direction.LEFT) {
        sprite.flipX = true;
      } else if (transitionData.direction === Direction.RIGHT) {
        sprite.flipX = false;
      }
      sprite.anims.play('hero-run');
    }
  })
];

export const HeroPrefab: Prefab = {
  components: [
    {
      component: SpriteComponent,
      data: {
        texture: 'hero',
        depth: Depths.hero,
        originX: 0,
        originY: 0.5
      }
    },
    GridPositionComponent,
    {
      component: StateMachineComponent,
      data: {
        states: heroStates,
        initialState: heroStates[0]
      }
    }
  ]
};
