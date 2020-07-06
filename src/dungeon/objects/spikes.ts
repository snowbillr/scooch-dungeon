import { DamageActorBehavior } from '../../behaviors/enter/damage-actor';
import { DungeonScene } from '../../scenes/dungeon-scene';
import { GridObject } from '../../grid-maps/grid-object';
import { GridTile, GridTileBehaviorType } from '../../grid-maps/grid-tile';

const REVEALED_DURATION = 2000;
const HIDDEN_DURATION = 3000;
const INITIAL_OFFSET = 1000;

export class Spikes extends GridObject {
  private damageActorBehavior: DamageActorBehavior;

  private hiddenDuration: number;

  constructor(
    scene: Phaser.Scene,
    dungeonTile: GridTile,
    name: string,
    sprite: Phaser.GameObjects.Sprite,
    extraProperties: Record<string, any>
  ) {
    super(scene, dungeonTile, name, sprite, extraProperties);

    this.damageActorBehavior = new DamageActorBehavior(this.dungeonTile);
    this.damageActorBehavior.setDamage(0.5);

    this.hiddenDuration = extraProperties.hiddenDuration ?? HIDDEN_DURATION;

    scene.time.delayedCall(extraProperties.offset ?? INITIAL_OFFSET, () => this.startCycle());
  }

  private async startCycle() {
    await this.playAnimation('spikes-peek');
    await this.playAnimation('spikes-reveal');

    this.dungeonTile.addBehavior(GridTileBehaviorType.ENTER, this.damageActorBehavior);

    await this.wait(REVEALED_DURATION);
    await this.playAnimation('spikes-hide');

    this.dungeonTile.removeBehavior(GridTileBehaviorType.ENTER, this.damageActorBehavior);

    this.scene.time.delayedCall(this.hiddenDuration, () => this.startCycle());
  }

  private async playAnimation(animationKey: string) {
    return new Promise(resolve => {
      this.sprite.on(`${Phaser.Animations.Events.SPRITE_ANIMATION_KEY_COMPLETE}${animationKey}`, () => {
        resolve();
      });
      this.sprite.anims.play(animationKey);
    });
  }

  private async wait(delay: number) {
    return new Promise(resolve => {
      this.scene.time.delayedCall(delay, resolve);
    });
  }
}
