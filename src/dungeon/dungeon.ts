import { DungeonStats } from "./dungeon-stats";

import { GridMap } from '../grid-maps/grid-map';
import { DungeonScene } from '../scenes/dungeon-scene';

export class Dungeon {
  public readonly stats: DungeonStats;
  public readonly coinCount: number;
  public readonly message: string;

  public readonly gridMap: GridMap<DungeonScene>;

  constructor(
    gridMap: GridMap<DungeonScene>) {
    this.gridMap = gridMap;

    this.message = gridMap.properties.message;

    this.coinCount = gridMap.gridTiles.reduce((count, dungeonTile) => {
      if (dungeonTile.hasObject('coin')) {
        return count + 1;
      } else {
        return count;
      }
    }, 0);

    this.stats = new DungeonStats();
  }
}
