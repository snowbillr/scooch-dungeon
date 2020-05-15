import { SpriteComponent } from "../../components/sprite-component";
import { Depths } from "../../constants/depths";
import { GridPositionComponent } from "../../components/grid-position-component";
import { StateMachineComponent } from "../../components/state-machine-component";
import { Prefab } from "phecs/dist/entity-manager";
import { Entity } from "phecs/dist/entity";
import { State, Transition, PhiniteStateMachine } from 'phinite-state-machine';
import { TransitionCallback, TriggerActivator } from 'phinite-state-machine/dist/transition';
import { DungeonScene } from '../../scenes/dungeon-scene';
import { DungeonTileBehaviorType } from '../../dungeon/dungeon-tile';
import { Direction } from '../../constants/directions';

function move(direction: Direction, scene: DungeonScene) {
  const coordinates = scene.hero.getComponent(GridPositionComponent);
  const cursor = scene.dungeon.getCursor(coordinates.gridX, coordinates.gridY);

  const tile = cursor.getTile();

  tile.runBehaviors(DungeonTileBehaviorType.INPUT, direction, scene);
}

class SwipeMovementTransition extends Transition<Entity, DungeonScene> {
  private direction?: Direction;

  constructor(to: string) {
    super(to);
  }

  registerTrigger(activateTrigger: TriggerActivator, scene: DungeonScene) {
    const handleSwipe = (direction: Direction) => {
      this.direction = direction;
      activateTrigger();
    }

    scene.swipe.addListener(handleSwipe);

    return () => scene.swipe.removeListener(handleSwipe);
  }

  onTransition(entity: Entity, scene: DungeonScene) {
    move(this.direction!, scene);
  }
}

export const heroStates: State<Entity>[] = [
  new State('idle', [new SwipeMovementTransition('moving')], {
    onEnter(hero, scene) {
      const dungeonScene = scene as DungeonScene;

      if (dungeonScene.queuedInput) {
        hero.getComponent(StateMachineComponent).stateMachine.transitionTo('moving');
        move(dungeonScene.queuedInput, dungeonScene);
        dungeonScene.queuedInput = undefined;
      } else {
        hero.getComponent(SpriteComponent).sprite.anims.play('hero-idle');
      }
    }
  }),
  new State('moving', [], {
    onEnter(hero, scene) {
      // TODO - can i put the movement code in here, and pass it extra data from wherever the transition happens?
      hero.getComponent(SpriteComponent).sprite.anims.play('hero-run');
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
