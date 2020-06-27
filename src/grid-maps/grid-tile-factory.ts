import { ScoochDungeonScene } from '../scenes/scooch-dungeon-scene';
import { GridTile, GridTileProperties } from './grid-tile';

export const OBJECTS_KEY = 'objects';

export class GridTileFactory {
  // private dungeonObjectFactory: DungeonObjectFactory;

  constructor(
    private scene: ScoochDungeonScene
  ) {
    // this.dungeonObjectFactory = new DungeonObjectFactory(scene);
  }

  create(
    gridX: number,
    gridY: number,
    worldX: number,
    worldY: number,
    properties: Record<string, any[]>,
    objects: Record<string, any>[]
  ): GridTile {
    const computedProperties: GridTileProperties = {
      walkable: properties.walkable.reduce((acc, w) => acc && w, true),
    };

    const gridTile = new GridTile(
      this.scene,
      gridX,
      gridY,
      worldX,
      worldY,
      computedProperties
    );

    /*
    const createdObjects = (objects || []).map(({ index, properties }) => {
      return this.dungeonObjectFactory.createByIndex(dungeonTile, index, properties)
    });
    dungeonTile.setObjects(createdObjects);
    */

    return gridTile;
  }

  /*
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
  */
}
