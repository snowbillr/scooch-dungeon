import { DungeonTile } from './dungeon-tile';
import { ScoochDungeonScene } from '../scenes/scooch-dungeon-scene';

export interface DungeonObjectConstructor {
  new (
    scene: ScoochDungeonScene,
    dungeonTile: DungeonTile,
    name: string,
    sprite: Phaser.GameObjects.Sprite,
  ): DungeonObject;
}

export class DungeonObject {
  constructor(
    public scene: ScoochDungeonScene,
    protected dungeonTile: DungeonTile,
    public name: string,
    public sprite: Phaser.GameObjects.Sprite,
  ) {}

  destroy() {
    this.sprite.destroy();
  }
}
