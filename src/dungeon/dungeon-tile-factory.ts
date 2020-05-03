import { DungeonTileProperties, DungeonTile, DungeonTileBehavior } from "./dungeon-tile";
import { Dungeon } from "./dungeon";
import { InputBehaviors } from "../behaviors/input-behaviors";
import { EnterBehaviors } from "../behaviors/enter-behaviors";

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
        dungeonTile.addInputBehavior(behavior);
      }
    });

    EnterBehaviors.forEach(behavior => {
      if (behavior.isApplicable(dungeonTile, dungeon)) {
        dungeonTile.addEnterBehavior(behavior);
      }
    });
  }
}