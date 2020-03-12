import { SpriteComponent } from "../../components/sprite-component";
import { Depths } from "../../constants/depths";

export const HeroPrefab = {
  components: [
    {
      component: SpriteComponent,
      data: {
        texture: 'hero',
        depth: Depths.hero
      }
    }
  ]
};
