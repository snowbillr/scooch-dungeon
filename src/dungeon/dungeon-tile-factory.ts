import { DungeonTileProperties, DungeonTile, DungeonTileBehaviorType } from "./dungeon-tile";
import { Dungeon } from "./dungeon";
import { InputBehaviors } from "../behaviors/input-behaviors";
import { EnterBehaviors } from "../behaviors/enter-behaviors";
import { ExitBehaviors } from "../behaviors/exit-behaviors";
import { DungeonObjectFactory } from './dungeon-object-factory';
import { DungeonScene } from '../scenes/dungeon-scene';

export const OBJECTS_KEY = 'objects';

export class DungeonTileFactory {
  private dungeonObjectFactory: DungeonObjectFactory;

  constructor(
    private scene: DungeonScene
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

    const dungeonTile = new DungeonTile(this.scene, gridX, gridY, worldX, worldY, computedProperties);
    const objects = (properties[OBJECTS_KEY] || []).map(objectIndex => this.dungeonObjectFactory.createByIndex(dungeonTile, objectIndex));
    dungeonTile.setObjects(objects);

    return dungeonTile;
  }

  addBehaviors(dungeonTile: DungeonTile, dungeon: Dungeon) {
    InputBehaviors.forEach(Behavior => {
      const inputBehavior = new Behavior(this.scene, dungeonTile, dungeon);
      if (inputBehavior.isApplicable()) {
        dungeonTile.addBehavior(DungeonTileBehaviorType.INPUT, inputBehavior);
      }
    });

    EnterBehaviors.forEach(Behavior => {
      const enterBehavior = new Behavior(this.scene, dungeonTile, dungeon);
      if (enterBehavior.isApplicable()) {
        dungeonTile.addBehavior(DungeonTileBehaviorType.ENTER, enterBehavior);
      }
    });

    ExitBehaviors.forEach(Behavior => {
      const exitBehavior = new Behavior(this.scene, dungeonTile, dungeon);
      if (exitBehavior.isApplicable()) {
        dungeonTile.addBehavior(DungeonTileBehaviorType.EXIT, exitBehavior);
      }
    });
  }
}
