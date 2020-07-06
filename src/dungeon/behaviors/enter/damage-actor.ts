import { Direction } from "../../../constants/directions";
import { SCENE_KEYS } from '../../../constants/scene-keys';
import { SpriteComponent } from '../../../components/sprite-component';
import { DungeonScene } from '../../../scenes/dungeon-scene';
import { GridTileBehavior } from '../../../grid-maps/grid-tile-behavior';

export class DamageActorBehavior extends GridTileBehavior {
  private damage: number = 0.5;

  public priority: number = 100;

  public setDamage(value: number) {
    this.damage = value;
  }

  public isApplicable(): boolean {
    return false;
  }

  public run(scene: DungeonScene, direction: Direction): boolean {
    const levelSession = scene.levelSession;

    scene.resetCombo();

    levelSession.subtractHealth(this.damage);
    scene.hud.updateHealth(levelSession.getHealth(), levelSession.getMaxHealth());

    scene.cameras.main.shake(200, 0.01);

    if (levelSession.getHealth() <= 0) {
      scene.sfx.pauseLevelMusic();
      scene.sfx.playDieSfx();

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
    } else {
      scene.sfx.playHurtSfx();
    }

    return false;
  }
}
