import { ScoochDungeonScene } from '../../scenes/scooch-dungeon-scene';
import { GridTile } from '../../grid-maps/grid-tile';
import { Direction } from '../../constants/directions';

export abstract class GridTileBehavior {
  public abstract priority: number;

  public readonly id: string;

  constructor(
    protected tile: GridTile,
  ) {
    this.id = this.generateId();
  }

  public abstract isApplicable(): boolean;

  public abstract run(scene: Phaser.Scene, direction: Direction): boolean;

  private generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
