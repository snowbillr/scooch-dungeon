import { DungeonScene } from '../scenes/dungeon-scene';
import { DungeonTile } from '../dungeon/dungeon-tile';
import { Dungeon } from '../dungeon/dungeon';
import { Direction } from '../constants/directions';

export abstract class DungeonBehavior {
  public readonly id: string;
  public abstract priority: number;

  constructor(
    protected scene: DungeonScene,
    protected tile: DungeonTile,
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
