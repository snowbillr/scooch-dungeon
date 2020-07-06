import { Direction } from "../constants/directions";

import { normalize } from '../lib/tiled-properties-normalizer';
import { GridTile } from './grid-tile';
import { GridMarker } from './grid-marker';
import { GridCursor } from './grid-cursor';
import { ScoochDungeonScene } from '../scenes/scooch-dungeon-scene';

export class GridMap<T extends ScoochDungeonScene> {
  public readonly worldWidth: number;
  public readonly worldHeight: number;
  public readonly gridWidth: number;
  public readonly gridHeight: number;
  public readonly properties: Record<string, any>;

  constructor(
    public gridTiles: GridTile<T>[],
    private markers: Record<string, GridMarker>,
    private floor: Phaser.Tilemaps.DynamicTilemapLayer  ,
    tilemap: Phaser.Tilemaps.Tilemap
  ) {
    this.worldWidth = tilemap.widthInPixels;
    this.worldHeight = tilemap.heightInPixels;
    this.gridWidth = tilemap.width;
    this.gridHeight = tilemap.height;

    this.properties = normalize(tilemap.properties);
  }

  public destroy() {
    this.gridTiles.forEach(dt => dt.destroy());
    delete this.gridTiles;

    delete this.markers;

    this.floor.destroy();

    delete this.floor;
  }

  public getMarker(name: string): GridMarker {
    return this.markers[name];
  }

  public getCursor(x: number, y: number): GridCursor<T> {
    return new GridCursor(this, x, y);
  }

  public hasTile(x: number, y: number): boolean {
    return this.gridTiles.some(tile => tile.isGridPosition(x, y));
  }

  public getTile(x: number, y: number): GridTile<T> {
    const tile = this.gridTiles
      .find(tile => tile.isGridPosition(x, y));

    if (!tile) throw new Error(`No tile found for ${x}, ${y}`);

    return tile;
  }

  public getWalkableNeighborTile(x: number, y: number, direction: Direction): GridTile<T> | undefined {
    const gridCursor = this.getCursor(x, y);
    gridCursor.move(direction);

    if (gridCursor.exists()) {
      const tile = gridCursor.getTile();

      return tile.getProperty("walkable") ? tile : undefined;
    } else {
      return undefined;
    }
  }
}
