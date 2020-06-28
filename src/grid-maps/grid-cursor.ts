import { Direction } from "../constants/directions";
import { GridMap } from './grid-map';
import { GridTile } from './grid-tile';
import { ScoochDungeonScene } from '../scenes/scooch-dungeon-scene';

export class GridCursor<T extends ScoochDungeonScene> {
  private initialX: number;
  private initialY: number;

  constructor(
    private gridMap: GridMap<T>,
    private x: number,
    private y: number
  ) {
    this.initialX = x;
    this.initialY = y;
  }

  move(direction: Direction) {
    switch (direction) {
      case Direction.UP:
        this.up();
        break;
      case Direction.DOWN:
        this.down();
        break;
      case Direction.LEFT:
        this.left();
        break;
      case Direction.RIGHT:
        this.right();
        break;
    }

    return this.exists();
  }

  up() {
    this.y -= 1;

    return this.exists();
  }

  down() {
    this.y += 1;

    return this.exists();
  }

  left() {
    this.x -= 1;

    return this.exists();
  }

  right() {
    this.x += 1;

    return this.exists();
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;

    return this.exists();
  }

  reset() {
    this.x = this.initialX;
    this.y = this.initialY;
  }

  exists(): boolean {
    return this.gridMap.hasTile(this.x, this.y);
  }

  getTile(): GridTile<T> {
    return this.gridMap.getTile(this.x, this.y);
  }

  getCardinalNeighbors(): { gridTile: GridTile<T>, direction: Direction }[] {
    const cardinalNeighbors = [];

    if (this.up()) {
      cardinalNeighbors.push({
        direction: Direction.UP,
        gridTile: this.getTile()
      });
    }
    this.down();

    if (this.down()) {
      cardinalNeighbors.push({
        direction: Direction.DOWN,
        gridTile: this.getTile()
      });
    }
    this.up();

    if (this.left()) {
      cardinalNeighbors.push({
        direction: Direction.LEFT,
        gridTile: this.getTile()
      });
    }
    this.right();

    if (this.right()) {
      cardinalNeighbors.push({
        direction: Direction.RIGHT,
        gridTile: this.getTile()
      });
    }
    this.left();

    return cardinalNeighbors;
  }
}
