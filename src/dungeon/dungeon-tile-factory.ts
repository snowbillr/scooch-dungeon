import { DungeonTileProperties, DungeonTile, DungeonTileBehavior, DungeonTileBehaviorType } from "./dungeon-tile";
import { Dungeon } from "./dungeon";
import { InputBehaviors } from "../behaviors/input-behaviors";
import { EnterBehaviors } from "../behaviors/enter-behaviors";
import { ExitBehaviors } from "../behaviors/exit-behaviors";

export class DungeonTileFactory {
  constructor() {}

  create(
    gridX: number,
    gridY: number,
    worldX: number,
    worldY: number,
    properties: Record<string, any[]>,
  ): DungeonTile {
    const computedProperties: DungeonTileProperties = {
      walkable: properties.walkable.reduce((acc, w) => acc && w, true),
      objective: properties.objective.reduce((acc, o) => acc || o, false)
    };

    return new DungeonTile(gridX, gridY, worldX, worldY, computedProperties, properties.objects || []);
  }

  addBehaviors(dungeonTile: DungeonTile, dungeon: Dungeon) {
    InputBehaviors.forEach(behavior => {
      if (behavior.isApplicable(dungeonTile, dungeon)) {
        dungeonTile.addBehavior(DungeonTileBehaviorType.INPUT, behavior);
      }
    });

    EnterBehaviors.forEach(behavior => {
      if (behavior.isApplicable(dungeonTile, dungeon)) {
        dungeonTile.addBehavior(DungeonTileBehaviorType.ENTER, behavior);
      }
    });

    ExitBehaviors.forEach(behavior => {
      if (behavior.isApplicable(dungeonTile, dungeon)) {
        dungeonTile.addBehavior(DungeonTileBehaviorType.EXIT, behavior);
      }
    });
  }
}