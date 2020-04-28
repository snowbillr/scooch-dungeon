import { DungeonTileProperties, DungeonTile, DungeonTileBehavior } from "./dungeon-tile";
import { Dungeon } from "./dungeon";
import { MoveBehavior } from "../behaviors/input/move";
import { WinBehavior } from "../behaviors/input/win";

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
    if (MoveBehavior.isApplicable(dungeonTile, dungeon)) {
      dungeonTile.addInputBehavior(MoveBehavior);
    }

    if (WinBehavior.isApplicable(dungeonTile, dungeon)) {
      dungeonTile.addInputBehavior(WinBehavior);
    }
  }
}