import { SpriteComponent } from "../../components/sprite-component";
import { Depths } from "../../constants/depths";
import { GridPositionComponent } from "../../components/grid-position-component";

export const HeroPrefab = {
  components: [
    {
      component: SpriteComponent,
      data: {
        texture: 'hero',
        depth: Depths.hero
      }
    },
    GridPositionComponent
  ]
};
