import { DungeonTileProperties, DungeonTile, DungeonTileBehavior } from "./dungeon-tile";
import { Dungeon } from "./dungeon";
import { InputBehaviors } from "../behaviors/input-behaviors";

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

  process(dungeonTile: DungeonTile, dungeon: Dungeon) {
    InputBehaviors.forEach(behavior => {
      if (behavior.isApplicable(dungeonTile, dungeon)) {
        dungeonTile.addInputBehavior(behavior);
      }
    })
  }
}