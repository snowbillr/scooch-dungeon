import { DungeonTile } from "./dungeon-tile";
import { Direction } from "../constants/directions";

export class Dungeon {
  constructor(
    private dungeonTiles: DungeonTile[],
    private floorLayer: Phaser.Tilemaps.StaticTilemapLayer
  ) {}

  public getTile(x: number, y: number): DungeonTile | undefined {
    return this.dungeonTiles
      .filter(tile => tile.isWalkable())
      .find(tile => tile.isPosition(x, y));
  }

  public getWalkableNeighborTile(x: number, y: number, direction: Direction): DungeonTile | undefined {
    let neighborX = x;
    let neighborY = y;
    switch (direction) {
      case Direction.UP:
        neighborY -= 1;
        break;
      case Direction.DOWN:
        neighborY += 1;
        break;
      case Direction.LEFT:
        neighborX -= 1;
        break;
      case Direction.RIGHT:
        neighborX += 1;
        break;
    }
    
    const neighborTile = this.dungeonTiles
      .filter(tile => tile.isWalkable())
      .find(tile => tile.isPosition(neighborX, neighborY))

    return neighborTile;
  }

  public getTileWorldPosition(gridX: number, gridY: number): Phaser.Math.Vector2 {
    const worldPosition = this.floorLayer.tileToWorldXY(gridX, gridY);

    worldPosition.add(new Phaser.Math.Vector2(16, 0)); // this centers the hero in the tile

    return worldPosition;
  }
}