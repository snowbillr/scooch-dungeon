import { ScoochDungeonScene } from '../scenes/scooch-dungeon-scene';
import { GridTile, GridTileProperties, GridTileBehaviorType } from './grid-tile';
import { GridMap } from './grid-map';
import { GridObjectFactory } from './grid-object-factory';

export const OBJECTS_KEY = 'objects';

export class GridTileFactory {
  private dungeonObjectFactory: GridObjectFactory;

  constructor(
    private scene: ScoochDungeonScene
  ) {
    this.dungeonObjectFactory = new GridObjectFactory(scene, []);
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

    const createdObjects = (objects || []).map(({ index, properties }) => {
      return this.dungeonObjectFactory.createByIndex(gridTile, index, properties)
    });
    gridTile.setObjects(createdObjects);

    return gridTile;
  }

  addBehaviors(gridTile: GridTile, gridMap: GridMap) {
    /*
    InputBehaviors.forEach(Behavior => {
      const inputBehavior = new Behavior(this.scene, gridTile, gridMap);
      if (inputBehavior.isApplicable()) {
        gridTile.addBehavior(GridTileBehaviorType.INPUT, inputBehavior);
      }
    });
    */

    /*
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
    */
  }
}
