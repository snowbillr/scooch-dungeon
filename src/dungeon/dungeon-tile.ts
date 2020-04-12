import { DirectionInputEffects, DirectionInputTypes, DirectionInputEffect } from "./direction-input-effects";

type DungeonTileProperties = {
  walkable: boolean;
  directionInputEffect: DirectionInputTypes;
};

export class DungeonTile {
  public readonly directionInputEffect?: DirectionInputEffect;
  // public readonly onEnterEffect?: EnterEffect

  constructor(
    public readonly x: number,
    public readonly y: number,
    private properties: DungeonTileProperties,
  ) {
    this.directionInputEffect = DirectionInputEffects.MOVE;
  }

  isWalkable() {
    return this.properties.walkable;
  }

  isPosition(x: number, y: number) {
    return x === this.x && y === this.y;
  }
}