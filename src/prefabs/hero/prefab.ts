import { SpriteComponent } from "../../components/sprite-component";
import { Depths } from "../../constants/depths";
import { GridPositionComponent } from "../../components/grid-position-component";
import { StateMachineComponent } from "../../components/state-machine-component";
import { Prefab } from "phecs/dist/entity-manager";

import { State } from 'phinite-state-machine/dist/types/state';
import { Entity } from "phecs/dist/entity";

const heroStates: State<Entity>[] = [
  {
    id: 'idle',
    transitions: [],
    onEnter(hero) {
      hero.getComponent(SpriteComponent).sprite.anims.play('hero-idle');
    }
  },
  {
    id: 'moving',
    transitions: [],
    onEnter(hero) {
      hero.getComponent(SpriteComponent).sprite.anims.play('hero-run');
    }
  }
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
