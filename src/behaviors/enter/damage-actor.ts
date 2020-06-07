import { Direction } from "../../constants/directions";
import { HealthComponent } from '../../components/health-component';
import { SCENE_KEYS } from '../../constants/scene-keys';
import { SpriteComponent } from '../../components/sprite-component';
import { DungeonBehavior } from '../dungeon-behavior';
import { DungeonScene } from '../../scenes/dungeon-scene';
import { DungeonTile } from '../../dungeon/dungeon-tile';
import { Dungeon } from '../../dungeon/dungeon';

export class DamageActorBehavior extends DungeonBehavior {
  private damage: number;

  public priority: number = 100;

  constructor(
    scene: DungeonScene,
    tile: DungeonTile,
    dungeon: Dungeon,
    damage: number
  ) {
    super(scene, tile, dungeon);

    this.damage = damage;
  }

  public isApplicable(): boolean {
    return false;
  }

  public run(direction: Direction): boolean {
    const healthComponent = this.scene.hero.getComponent(HealthComponent);

    healthComponent.subtract(this.damage);

    this.scene.hud.updateHealth(healthComponent.currentHealth, healthComponent.maxHealth);
    this.scene.cameras.main.shake(200, 0.01);

    if (healthComponent.currentHealth <= 0) {
      const heroSprite = this.scene.hero.getComponent(SpriteComponent);
      this.scene.tweens.killTweensOf(heroSprite.sprite)
      heroSprite.sprite.on(`${Phaser.Animations.Events.SPRITE_ANIMATION_KEY_COMPLETE}hero-die`, () => {
        this.scene.cameras.main.fadeOut(500, 0, 0, 0, (camera: any, progress: number) => {
          if (progress >= 0.99) {
            this.scene.scene.stop();
            this.scene.scene.stop(SCENE_KEYS.HUD);
            this.scene.scene.start(SCENE_KEYS.DEATH);
          }
        })
      })
      heroSprite.sprite.anims.play('hero-die')
    }

    return false;
  }
}
