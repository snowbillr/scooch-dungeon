import { DungeonStats } from "./dungeon-stats";

import { normalize } from '../lib/tiled-properties-normalizer';
import { GridMap } from '../grid-maps/grid-map';
import { GridTile } from '../grid-maps/grid-tile';
import { GridMarker } from '../grid-maps/grid-marker';
import { DungeonScene } from '../scenes/dungeon-scene';

export class Dungeon {
  public readonly stats: DungeonStats;
  public readonly coinCount: number;
  public readonly message: string;

  public readonly gridMap: GridMap<DungeonScene>;

  constructor(
    gridMap: GridMap<DungeonScene>) {
    this.gridMap = gridMap;

    this.message = normalize(gridMap.tilemap.properties).message;

    this.coinCount = gridMap.gridTiles.reduce((count, dungeonTile) => {
      if (Boolean(dungeonTile.getObject('coin'))) {
        return count + 1;
      } else {
        return count;
      }
    }, 0);

    this.stats = new DungeonStats();
  }
}
