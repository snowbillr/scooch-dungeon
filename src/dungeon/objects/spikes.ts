import { DungeonObject } from '../dungeon-object';
import { DungeonTile, DungeonTileBehaviorType } from '../dungeon-tile';
import { DamageActorBehavior } from '../../behaviors/enter/damage-actor';
import { DungeonScene } from '../../scenes/dungeon-scene';

const REVEALED_DURATION = 2000;
const HIDDEN_DURATION = 5000;
const INITIAL_OFFSET = 2000;

export class Spikes extends DungeonObject {
  private damageActorBehavior: DamageActorBehavior;

  constructor(
    scene: DungeonScene,
    dungeonTile: DungeonTile,
    name: string,
    sprite: Phaser.GameObjects.Sprite,
  ) {
    super(scene, dungeonTile, name, sprite);

    this.damageActorBehavior = new DamageActorBehavior(this.scene, this.dungeonTile, this.scene.dungeon);
    this.damageActorBehavior.setDamage(0.5);

    scene.time.delayedCall(INITIAL_OFFSET, () => this.startCycle());
  }

  private async startCycle() {
    await this.playAnimation('spikes-peek');
    await this.playAnimation('spikes-reveal');

    this.dungeonTile.addBehavior(DungeonTileBehaviorType.ENTER, this.damageActorBehavior);

    await this.wait(REVEALED_DURATION);
    await this.playAnimation('spikes-hide');

    this.dungeonTile.removeBehavior(DungeonTileBehaviorType.ENTER, this.damageActorBehavior);

    this.scene.time.delayedCall(HIDDEN_DURATION, () => this.startCycle());
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
