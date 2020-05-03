import { DungeonTileBehavior, DungeonTile } from "../../dungeon/dungeon-tile";
import { Direction } from "../../constants/directions";
import { Dungeon } from "../../dungeon/dungeon";
import { DungeonScene } from "../../scenes/dungeon-scene";

export const CollectCoinBehavior: DungeonTileBehavior = {
  isApplicable(dungeonTile: DungeonTile, dungeon: Dungeon) {
    return Boolean(dungeonTile.getObject('coin'));
  },

  run(direction: Direction, dungeonTile: DungeonTile, scene: DungeonScene) {
    console.log('collect coin')
  }
}