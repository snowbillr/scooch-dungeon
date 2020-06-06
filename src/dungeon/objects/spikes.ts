import { DungeonObject } from '../dungeon-object';
import { DungeonTile } from '../dungeon-tile';
import { ScoochDungeonScene } from '../../scenes/scooch-dungeon-scene';

export class Spikes extends DungeonObject {
  constructor(
    scene: ScoochDungeonScene,
    dungeonTile: DungeonTile,
    name: string,
    sprite: Phaser.GameObjects.Sprite,
  ) {
    super(scene, dungeonTile, name, sprite);
  }
}
