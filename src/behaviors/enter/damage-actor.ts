import { DungeonTileBehavior, DungeonTile, DungeonTileBehaviorType } from "../../dungeon/dungeon-tile";
import { Direction } from "../../constants/directions";
import { Dungeon } from "../../dungeon/dungeon";
import { DungeonScene } from "../../scenes/dungeon-scene";
import { HealthComponent } from '../../components/health-component';
import { SCENE_KEYS } from '../../constants/scene-keys';
import { SpriteComponent } from '../../components/sprite-component';

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

    if (healthComponent.currentHealth <= 0) {
      console.log('dead')
      const heroSprite = scene.hero.getComponent(SpriteComponent);
      scene.tweens.killTweensOf(heroSprite.sprite)
      heroSprite.sprite.on(`${Phaser.Animations.Events.SPRITE_ANIMATION_KEY_COMPLETE}hero-die`, () => {
        scene.cameras.main.fadeOut(500, 0, 0, 0, (camera: any, progress: number) => {
          if (progress >= 0.99) {
            scene.scene.stop();
            scene.scene.stop(SCENE_KEYS.HUD);
            scene.scene.start(SCENE_KEYS.DEATH);
          }
        })
      })
      heroSprite.sprite.anims.play('hero-die')
    }
  }
}
