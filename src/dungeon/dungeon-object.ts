import { DungeonScene } from '../scenes/dungeon-scene';
import { GridObject, GridObjectConstructor } from '../grid-maps/grid-object';
import { GridTile } from '../grid-maps/grid-tile';

export interface DungeonObjectConstructor extends GridObjectConstructor<DungeonScene> {}

export class DungeonObject extends GridObject<DungeonScene> {
  constructor(
    scene: DungeonScene,
    dungeonTile: GridTile<DungeonScene>,
    name: string,
    sprite: Phaser.GameObjects.Sprite,
    extraProperties: Record<string, any>
  ) {
    super(scene, dungeonTile, name, sprite, extraProperties);
  }
}
