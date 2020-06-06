import { DungeonTile } from './dungeon-tile';

export interface DungeonObjectConstructor {
  new (
    dungeonTile: DungeonTile,
    name: string,
    sprite: Phaser.GameObjects.Sprite,
  ): DungeonObject;
}

export class DungeonObject {
  constructor(
    protected dungeonTile: DungeonTile,
    public name: string,
    public sprite: Phaser.GameObjects.Sprite,
  ) {}

  destroy() {
    this.sprite.destroy();
  }
}
