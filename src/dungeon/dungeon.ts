import { DungeonTile } from "./dungeon-tile";
import { Direction } from "../constants/directions";
import { DungeonMarker } from "./dungeon-marker";
import { DungeonLayers } from "./dungeon-factory";
import { DungeonCursor } from "./dungeon-cursor";

export class Dungeon {
  public readonly worldWidth: number;
  public readonly worldHeight: number;
  public readonly gridWidth: number;
  public readonly gridHeight: number;

  constructor(
    private dungeonTiles: DungeonTile[],
    private markers: Record<string, DungeonMarker>,
    private layers: DungeonLayers,
    tilemap: Phaser.Tilemaps.Tilemap
  ) {
    this.worldWidth = tilemap.widthInPixels;
    this.worldHeight = tilemap.heightInPixels;
    this.gridWidth = tilemap.width;
    this.gridHeight = tilemap.height;
  }

  public destroy() {
    this.dungeonTiles.forEach(dt => dt.destroy());
    delete this.dungeonTiles;

    delete this.markers;

    this.layers.floor.destroy();
    this.layers.objects.destroy();

    delete this.layers;
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