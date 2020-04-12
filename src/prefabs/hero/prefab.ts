import { SpriteComponent } from "../../components/sprite-component";
import { Depths } from "../../constants/depths";
import { GridPositionComponent } from "../../components/grid-position-component";
import { StateMachineComponent } from "../../components/state-machine-component";

const heroStates = [
  {
    id: 'idle',
    transitions: []
  },
  {
    id: 'moving',
    transitions: []
  }
];

export const HeroPrefab = {
  components: [
    {
      component: SpriteComponent,
      data: {
        texture: 'hero',
        depth: Depths.hero
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
