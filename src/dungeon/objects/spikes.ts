import { DungeonObject } from '../dungeon-object';
import { DungeonTile, DungeonTileBehaviorType } from '../dungeon-tile';
import { ScoochDungeonScene } from '../../scenes/scooch-dungeon-scene';
import { DamageActor } from '../../behaviors/enter/damage-actor';

export class Spikes extends DungeonObject {
  constructor(
    scene: ScoochDungeonScene,
    dungeonTile: DungeonTile,
    name: string,
    sprite: Phaser.GameObjects.Sprite,
  ) {
    super(scene, dungeonTile, name, sprite);

    scene.time.addEvent({
      loop: true,
      delay: 7000,
      startAt: 6000,
      callback: () => this.startCycle()
    });
  }

  private async startCycle() {
    await this.playAnimation('spikes-peek');
    await this.playAnimation('spikes-reveal');

    this.dungeonTile.addBehavior(DungeonTileBehaviorType.ENTER, DamageActor);

    await this.wait(2000);
    await this.playAnimation('spikes-hide');

    this.dungeonTile.removeBehavior(DungeonTileBehaviorType.ENTER, DamageActor);
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
