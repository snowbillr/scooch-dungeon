import { ScoochDungeonScene } from '../scenes/scooch-dungeon-scene';
import { GridTile, GridTileProperties, GridTileBehaviorType } from './grid-tile';
import { GridObjectFactory } from './grid-object-factory';
import { InputBehaviors } from '../dungeon/behaviors/input-behaviors';
import { EnterBehaviors } from '../dungeon/behaviors/enter-behaviors';
import { ExitBehaviors } from '../dungeon/behaviors/exit-behaviors';

export class GridTileFactory {
  constructor(
    private scene: Phaser.Scene,
    private dungeonObjectFactory: GridObjectFactory
  ) {
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
      objective: properties.objective.reduce((acc, o) => acc || o, false),
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

  addBehaviors(gridTile: GridTile) {
    InputBehaviors.forEach(Behavior => {
      const inputBehavior = new Behavior(gridTile);
      if (inputBehavior.isApplicable()) {
        gridTile.addBehavior(GridTileBehaviorType.INPUT, inputBehavior);
      }
    });

    EnterBehaviors.forEach(Behavior => {
      const enterBehavior = new Behavior(gridTile);
      if (enterBehavior.isApplicable()) {
        gridTile.addBehavior(GridTileBehaviorType.ENTER, enterBehavior);
      }
    });

    ExitBehaviors.forEach(Behavior => {
      const exitBehavior = new Behavior(gridTile);
      if (exitBehavior.isApplicable()) {
        gridTile.addBehavior(GridTileBehaviorType.EXIT, exitBehavior);
      }
    });
  }
}