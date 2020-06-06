import { DungeonTileBehavior, DungeonTile, DungeonTileBehaviorType } from "../../dungeon/dungeon-tile";
import { Direction } from "../../constants/directions";
import { Dungeon } from "../../dungeon/dungeon";
import { DungeonScene } from "../../scenes/dungeon-scene";
import { HealthComponent } from '../../components/health-component';

export const DamageActor: DungeonTileBehavior = {
  priority: 100,

  isApplicable(dungeonTile: DungeonTile, dungeon: Dungeon) {
    return false;
  },

  run(direction: Direction, dungeonTile: DungeonTile, scene: DungeonScene) {
    const healthComponent = scene.hero.getComponent(HealthComponent);

    healthComponent.subtract(0.5);
    scene.hud.updateHealth(healthComponent.currentHealth, healthComponent.maxHealth);

    scene.cameras.main.shake(200, 0.01);
  }
}
