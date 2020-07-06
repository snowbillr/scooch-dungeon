import { ScoochDungeonScene } from '../scenes/scooch-dungeon-scene';
import { GridTile } from './grid-tile';

export interface GridObjectConstructor {
  new (
    scene: Phaser.Scene,
    dungeonTile: GridTile,
    name: string,
    sprite: Phaser.GameObjects.Sprite,
    extraProperties: Record<string, any>
  ): GridObject;
}

export class GridObject {
  constructor(
    public scene: Phaser.Scene,
    protected dungeonTile: GridTile,
    public name: string,
    public sprite: Phaser.GameObjects.Sprite,
    extraProperties: Record<string, any>
  ) {}

  destroy() {
    this.sprite.destroy();
  }
}
