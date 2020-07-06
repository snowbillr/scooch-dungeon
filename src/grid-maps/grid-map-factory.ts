import { ScoochDungeonScene } from '../scenes/scooch-dungeon-scene';
import { GridTileData } from './grid-tile-data';
import { normalize } from '../lib/tiled-properties-normalizer';
import { GridTile } from './grid-tile';
import { GridTileFactory } from './grid-tile-factory';
import { GridMap } from './grid-map';
import { GridMarker } from './grid-marker';

export class GridMapFactory<T extends ScoochDungeonScene> {
  constructor(
    private scene: T,
    private gridTileFactory: GridTileFactory<T>
  ) {}

  public createGridMap(tilesetName: string, tilesetSource: string, levelKey: string, x: number, y: number) {
    const tilemap = this.scene.add.tilemap(levelKey);
    tilemap.addTilesetImage(tilesetName, tilesetSource);

    const floor = this.createFloor(tilemap, tilesetName, x, y);

    const gridTiles = this.createGridTiles(tilemap, floor);
    const gridMarkers = this.createGridMarkers(tilemap, x, y);

    const gridMap = new GridMap(gridTiles, gridMarkers, tilemap);
    gridTiles.forEach(gridTile => gridTile.setGridMap(gridMap));
    gridTiles.forEach(gridTile => this.gridTileFactory.addBehaviors(gridTile));

    return gridMap;
  }

  private createFloor(tilemap: Phaser.Tilemaps.Tilemap, tilesetName: string, x: number, y: number): Phaser.Tilemaps.DynamicTilemapLayer {
    return tilemap.createDynamicLayer('floor', tilesetName, x, y);
  }

  private createGridTiles(tilemap: Phaser.Tilemaps.Tilemap, floor: Phaser.Tilemaps.DynamicTilemapLayer): GridTile<T>[] {
    const tileData = new GridTileData();

    // gather floor tile data
    floor.forEachTile(function(tile: Phaser.Tilemaps.Tile) {
      Object.entries(tile.properties).forEach(([key, value]) => {
        tileData.addKeyValue(tile.x, tile.y, key, value);
      });
    }, this, 0, 0, tilemap.width, tilemap.height, {
      isNotEmpty: true
    });

    // gather object tile data
    const objectLayer = tilemap.getObjectLayer('objects') ?? { objects: [] };
    const objects = objectLayer.objects.map(o => {
      return {
        gridX: Math.round(o.x! / 32),
        gridY: Math.round((o.y! - 32) / 32),
        index: o.gid!,
        properties: normalize(o.properties!)
      }
    });
    objects.forEach(object => {
      tileData.addObject(object.gridX, object.gridY, object.index, object.properties);

      Object.entries(object.properties).forEach(([key, value]) => {
        tileData.addKeyValue(object.gridX, object.gridY, key, value);
      });
    });

    // create tiles
    const gridTiles: GridTile<T>[] = [];
    tileData.forEach((coordinates, properties, objects) => {
      const worldCoordinates = tilemap.tileToWorldXY(coordinates.x, coordinates.y);

      const dungeonTile = this.gridTileFactory.create(
        coordinates.x,
        coordinates.y,
        worldCoordinates.x,
        worldCoordinates.y,
        properties,
        objects
      );
      gridTiles.push(dungeonTile);
    });

    return gridTiles;
  }

  private createGridMarkers(tilemap: Phaser.Tilemaps.Tilemap, x: number, y: number): Record<string, GridMarker> {
    const markers = tilemap.getObjectLayer('markers').objects;
    const dungeonMarkers: Record<string, GridMarker> = markers.reduce((acc, marker) => {
      const gridCoordinates = tilemap.getTileAtWorldXY(marker.x! + x, marker.y! + y);
      const worldCoordinates = tilemap.tileToWorldXY(gridCoordinates.x, gridCoordinates.y);

      acc[marker.name] = new GridMarker(marker.name, gridCoordinates.x, gridCoordinates.y, worldCoordinates.x, worldCoordinates.y);

      return acc;
    }, {} as Record<string, GridMarker>);

    return dungeonMarkers;
  }
}
