import { DungeonTileProperties, DungeonTile, DungeonTileBehaviorType } from "./dungeon-tile";
import { Dungeon } from "./dungeon";
import { InputBehaviors } from "../behaviors/input-behaviors";
import { EnterBehaviors } from "../behaviors/enter-behaviors";
import { ExitBehaviors } from "../behaviors/exit-behaviors";
import { ScoochDungeonScene } from '../scenes/scooch-dungeon-scene';
import { DungeonObjectFactory } from './dungeon-object-factory';

export const OBJECTS_KEY = 'objects';

export class DungeonTileFactory {
  private dungeonObjectFactory: DungeonObjectFactory;

  constructor(
    private scene: ScoochDungeonScene
  ) {
    this.dungeonObjectFactory = new DungeonObjectFactory(scene);
  }

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

    const dungeonTile = new DungeonTile(gridX, gridY, worldX, worldY, computedProperties);
    const objects = (properties[OBJECTS_KEY] || []).map(objectIndex => this.dungeonObjectFactory.createByIndex(dungeonTile, objectIndex));
    dungeonTile.setObjects(objects);

    return dungeonTile;
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
