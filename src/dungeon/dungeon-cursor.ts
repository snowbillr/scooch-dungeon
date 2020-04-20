import { Dungeon } from "./dungeon";
import { DungeonTile } from "./dungeon-tile";
import { Direction } from "../constants/directions";

export class DungeonCursor {
  constructor(
    private dungeon: Dungeon,
    private x: number,
    private y: number
  ) {}

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

  exists(): boolean {
    return this.dungeon.hasTile(this.x, this.y);
  }

  getTile(): DungeonTile {
    return this.dungeon.getTile(this.x, this.y);
  }
}