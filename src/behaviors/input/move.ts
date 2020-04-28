import { DungeonTileBehavior, DungeonTile } from "../../dungeon/dungeon-tile";
import { MovementPlanner } from "../../dungeon/movement-planner";
import { Entity } from "phecs/dist/entity";
import { Direction } from "../../constants/directions";
import { Dungeon } from "../../dungeon/dungeon";
import { DungeonScene } from "../../scenes/dungeon-scene";

export const MoveBehavior: DungeonTileBehavior = {
  isApplicable(dungeonTile: DungeonTile, dungeon: Dungeon) {
    return dungeonTile.isWalkable();
  },

  run(hero: Entity, direction: Direction, dungeon: Dungeon, dungeonTile: DungeonTile, scene: DungeonScene) {
    const movementTimeline = MovementPlanner.buildMovementTimeline(hero, direction, dungeon, scene);
    movementTimeline.play();
  }
}