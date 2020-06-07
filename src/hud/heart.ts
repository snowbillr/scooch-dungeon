import { ScoochDungeonScene } from '../scenes/scooch-dungeon-scene';

export enum HeartValue {
  EMPTY,
  HALF,
  FULL
};

export class Heart {
  public gameObject: Phaser.GameObjects.Sprite;

  constructor(scene: ScoochDungeonScene, x: number, y: number, value: HeartValue = HeartValue.FULL) {
    this.gameObject = scene.add.sprite(x, y, 'hud-heart', 2).setOrigin(1, 0.5);
    this.setValue(value);
  }

  setValue(value: HeartValue) {
    this.gameObject.setFrame(this.valueToFrame(value))
  }

  private valueToFrame(value: number) {
    switch (value) {
      case HeartValue.EMPTY:
        return 0;
      case HeartValue.HALF:
        return 1;
      case HeartValue.FULL:
        return 2;
      default:
        return 0;
    }
  }
}
