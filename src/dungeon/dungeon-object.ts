import { DungeonTile } from './dungeon-tile';

export class DungeonObject {
  constructor(
    private dungeonTile: DungeonTile,
    public name: string,
    public sprite: Phaser.GameObjects.Sprite,
  ) {}

  destroy() {
    this.sprite.destroy();
  }
}
