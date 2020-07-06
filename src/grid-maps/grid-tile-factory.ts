import { ScoochDungeonScene } from '../scenes/scooch-dungeon-scene';
import { GridTile, GridTileProperties, GridTileBehaviorType, GridTilePropertiesComputer, GridTileBehaviorMap } from './grid-tile';
import { GridObjectFactory } from './grid-object-factory';
import { InputBehaviors } from '../dungeon/behaviors/input-behaviors';
import { EnterBehaviors } from '../dungeon/behaviors/enter-behaviors';
import { ExitBehaviors } from '../dungeon/behaviors/exit-behaviors';
import { GridTileBehavior } from './grid-tile-behavior';

export class GridTileFactory {
  constructor(
    private scene: Phaser.Scene,
    private gridTilePropertiesComputer: GridTilePropertiesComputer,
    private gridTileBehaviorMap: GridTileBehaviorMap,
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
    const gridTile = new GridTile(
      this.scene,
      gridX,
      gridY,
      worldX,
      worldY,
      this.gridTilePropertiesComputer(properties)
    );

    const createdObjects = (objects || []).map(({ index, properties }) => {
      return this.dungeonObjectFactory.createByIndex(gridTile, index, properties)
    });
    gridTile.setObjects(createdObjects);

    return gridTile;
  }

  addBehaviors(gridTile: GridTile) {
    Object.entries(this.gridTileBehaviorMap).forEach(([type, behaviors]) => {
      behaviors.forEach(Behavior => {
        const behavior = new Behavior(gridTile);
        if (behavior.isApplicable()) {
          gridTile.addBehavior(type as GridTileBehaviorType, behavior);
        }
      });
    });
  }
}
