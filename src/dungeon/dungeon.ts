import { DungeonTile } from "./dungeon-tile";
import { Direction } from "../constants/directions";
import { DungeonMarker } from "./dungeon-marker";
import { DungeonCursor } from "./dungeon-cursor";
import { DungeonStats } from "./dungeon-stats";

import { normalize } from '../lib/tiled-properties-normalizer';

export class Dungeon {
  public readonly worldWidth: number;
  public readonly worldHeight: number;
  public readonly gridWidth: number;
  public readonly gridHeight: number;

  public readonly stats: DungeonStats;

  public readonly coinCount: number;

  public readonly message: string;

  constructor(
    private dungeonTiles: DungeonTile[],
    private markers: Record<string, DungeonMarker>,
    private floor: Phaser.Tilemaps.DynamicTilemapLayer  ,
    tilemap: Phaser.Tilemaps.Tilemap
  ) {
    this.worldWidth = tilemap.widthInPixels;
    this.worldHeight = tilemap.heightInPixels;
    this.gridWidth = tilemap.width;
    this.gridHeight = tilemap.height;

    this.message = normalize(tilemap.properties).message;

    this.coinCount = dungeonTiles.reduce((count, dungeonTile) => {
      if (Boolean(dungeonTile.getObject('coin'))) {
        return count + 1;
      } else {
        return count;
      }
    }, 0);

    this.stats = new DungeonStats();
  }

  public destroy() {
    this.dungeonTiles.forEach(dt => dt.destroy());
    delete this.dungeonTiles;

    delete this.markers;

    this.floor.destroy();

    delete this.floor;
  }

  public getMarker(name: string): DungeonMarker {
    return this.markers[name];
  }

  public getCursor(x: number, y: number): DungeonCursor {
    return new DungeonCursor(this, x, y);
  }

  public hasTile(x: number, y: number): boolean {
    return this.dungeonTiles.some(tile => tile.isGridPosition(x, y));
  }

  public getTile(x: number, y: number): DungeonTile {
    const tile = this.dungeonTiles
      .find(tile => tile.isGridPosition(x, y));

    if (!tile) throw new Error(`No tile found for ${x}, ${y}`);

    return tile;
  }

  public getWalkableNeighborTile(x: number, y: number, direction: Direction): DungeonTile | undefined {
    const dungeonCursor = this.getCursor(x, y);
    dungeonCursor.move(direction);

    if (dungeonCursor.exists()) {
      const tile = dungeonCursor.getTile();

      return tile.isWalkable() ? tile : undefined;
    } else {
      return undefined;
    }
  }
}
