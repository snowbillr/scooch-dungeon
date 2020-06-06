import { DungeonObject } from '../dungeon-object';
import { DungeonTile } from '../dungeon-tile';

export class Spikes extends DungeonObject {
  constructor(
    dungeonTile: DungeonTile,
    name: string,
    sprite: Phaser.GameObjects.Sprite,
  ) {
    super(dungeonTile, name, sprite);
  }
}
