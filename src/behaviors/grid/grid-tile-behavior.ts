import { ScoochDungeonScene } from '../../scenes/scooch-dungeon-scene';
import { GridTile } from '../../grid-maps/grid-tile';
import { GridMap } from '../../grid-maps/grid-map';
import { Direction } from '../../constants/directions';

export abstract class GridTileBehavior<T extends ScoochDungeonScene = ScoochDungeonScene> {
  public readonly id: string;
  public abstract priority: number;

  constructor(
    protected scene: T,
    protected tile: GridTile,
    protected gridMap: GridMap
  ) {
    this.id = this.generateId();
  }

  public abstract isApplicable(): boolean;

  public abstract run(direction: Direction): boolean;

  private generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
