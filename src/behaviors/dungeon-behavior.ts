import { DungeonScene } from '../scenes/dungeon-scene';
import { Dungeon } from '../dungeon/dungeon';
import { Direction } from '../constants/directions';
import { GridTile } from '../grid-maps/grid-tile';

export abstract class DungeonBehavior {
  public readonly id: string;
  public abstract priority: number;

  constructor(
    protected scene: DungeonScene,
    protected tile: GridTile,
    protected dungeon: Dungeon
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
