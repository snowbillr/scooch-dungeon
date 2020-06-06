import { DungeonTileBehavior, DungeonTile, DungeonTileBehaviorType } from "../../dungeon/dungeon-tile";
import { Direction } from "../../constants/directions";
import { Dungeon } from "../../dungeon/dungeon";
import { DungeonScene } from "../../scenes/dungeon-scene";

export const DamageActor: DungeonTileBehavior = {
  priority: 100,

  isApplicable(dungeonTile: DungeonTile, dungeon: Dungeon) {
    return false;
  },

  run(direction: Direction, dungeonTile: DungeonTile, scene: DungeonScene) {
    scene.cameras.main.shake(200, 0.01);
  }
}
