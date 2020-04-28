import { DungeonTileBehavior, DungeonTile } from "../../dungeon/dungeon-tile";
import { MovementPlanner } from "../../dungeon/movement-planner";
import { Entity } from "phecs/dist/entity";
import { Direction } from "../../constants/directions";
import { Dungeon } from "../../dungeon/dungeon";
import { BaseBehavior } from "../base-behavior";
import { ScoochDungeonScene } from "../../scenes/scooch-dungeon-scene";
import { DungeonScene } from "../../scenes/dungeon-scene";

/*
export class MoveBehavior extends BaseBehavior {
  constructor(scene: Phaser.Scene) {
    super(scene);
  }

  isApplicable(dungeon: Dungeon, dungeonTile: DungeonTile) {
    return dungeonTile.isWalkable();
  }

  run(hero: Entity, direction: Direction, dungeon: Dungeon) {
    const movementTimeline = MovementPlanner.buildMovementTimeline(hero, direction, dungeon, this.scene);
    movementTimeline.play();
  }
}
*/
export const MoveBehavior: DungeonTileBehavior = {
  isApplicable(dungeon: Dungeon, dungeonTile: DungeonTile) {
    return dungeonTile.isWalkable();
  },

  run(hero: Entity, direction: Direction, dungeon: Dungeon, dungeonTile: DungeonTile, scene: DungeonScene) {
    const movementTimeline = MovementPlanner.buildMovementTimeline(hero, direction, dungeon, scene);
    movementTimeline.play();
  }
}