export type GridTileDataForEachCallback = (
    coordinates: { x: number; y: number },
    data: Record<string, any>,
    objects: Record<string, any>[]
  ) => void;

export class GridTileData {
  private tileData: Record<string, Record<string, any[]>>;
  private tileObjects: Record<string, Record<string, any>[]>;

  constructor() {
    this.tileData = {};
    this.tileObjects = {};
  }

  addKeyValue(x: number, y: number, key: string, value: any) {
    const tileKey = this.coordinatesToTileKey(x, y);
    this.tileData[tileKey] = this.tileData[tileKey] ?? {}

    this.tileData[tileKey][key] = this.tileData[tileKey][key] ?? [];
    this.tileData[tileKey][key].push(value);
  }

  addObject(x: number, y: number, index: number, properties: Record<string, any>) {
    const tileKey = this.coordinatesToTileKey(x, y);

    this.tileObjects[tileKey] = this.tileObjects[tileKey] ?? [];
    this.tileObjects[tileKey].push({
      index,
      properties
    });
  }

  forEach(fn: GridTileDataForEachCallback) {
    Object.entries(this.tileData).forEach(([tileKey, data]) => {
      const coordinates = this.tileKeyToCoordinates(tileKey);

      fn(coordinates, data, this.tileObjects[tileKey]);
    });
  }

  private coordinatesToTileKey(x: number, y: number) {
    return `${x},${y}`;
  }

  private tileKeyToCoordinates(tileKey: string) {
    const [x, y] = tileKey.split(',').map(Number);

    return { x, y };
  }
}
