import { ScoochDungeonScene } from '../scenes/scooch-dungeon-scene';
import { GridTile } from './grid-tile';

export interface GridObjectConstructor<T extends ScoochDungeonScene> {
  new (
    scene: T,
    dungeonTile: GridTile<T>,
    name: string,
    sprite: Phaser.GameObjects.Sprite,
    extraProperties: Record<string, any>
  ): GridObject<T>;
}

export class GridObject<T extends ScoochDungeonScene> {
  constructor(
    public scene: T,
    protected dungeonTile: GridTile<T>,
    public name: string,
    public sprite: Phaser.GameObjects.Sprite,
    extraProperties: Record<string, any>
  ) {}

  destroy() {
    this.sprite.destroy();
  }
}
