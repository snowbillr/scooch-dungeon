import { Dungeon } from "./dungeon";
import { DungeonTile } from "./dungeon-tile";
import { Direction } from "../constants/directions";

export class DungeonCursor {
  private initialX: number;
  private initialY: number;

  constructor(
    private dungeon: Dungeon,
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
    return this.dungeon.hasTile(this.x, this.y);
  }

  getTile(): DungeonTile {
    return this.dungeon.getTile(this.x, this.y);
  }

  getCardinalNeighbors(): { dungeonTile: DungeonTile, direction: Direction }[] {
    const cardinalNeighbors = [];

    if (this.up()) {
      cardinalNeighbors.push({
        direction: Direction.UP,
        dungeonTile: this.getTile()
      });
    }
    this.down();

    if (this.down()) {
      cardinalNeighbors.push({
        direction: Direction.DOWN,
        dungeonTile: this.getTile()
      });
    }
    this.up();

    if (this.left()) {
      cardinalNeighbors.push({
        direction: Direction.LEFT,
        dungeonTile: this.getTile()
      });
    }
    this.right();
    
    if (this.right()) {
      cardinalNeighbors.push({
        direction: Direction.RIGHT,
        dungeonTile: this.getTile()
      });
    }
    this.left();

    return cardinalNeighbors;
  }
}