import { Dungeon } from './dungeon';
import { DungeonScene } from '../scenes/dungeon-scene';
import { GridMapFactory } from '../grid-maps/grid-map-factory';
import { GridTileFactory } from '../grid-maps/grid-tile-factory';
import { GridObjectFactory } from '../grid-maps/grid-object-factory';
import { dungeonObjectsList } from './objects/dungeon-objects-list';
import { GridTileBehaviorType } from '../grid-maps/grid-tile';
import { InputBehaviors } from './behaviors/input-behaviors';
import { EnterBehaviors } from './behaviors/enter-behaviors';
import { ExitBehaviors } from './behaviors/exit-behaviors';


export class DungeonFactory {
  private gridMapFactory: GridMapFactory;

  constructor(scene: DungeonScene) {
    const gridObjectFactory = new GridObjectFactory(scene, dungeonObjectsList);
    const gridTileFactory = new GridTileFactory(
      scene,
      rawProperties => {
        return {
          walkable: rawProperties.walkable.reduce((acc, w) => acc && w, true),
          objective: rawProperties.objective.reduce((acc, o) => acc || o, false),
        }
      },
      {
        [GridTileBehaviorType.INPUT]: InputBehaviors,
        [GridTileBehaviorType.ENTER]: EnterBehaviors,
        [GridTileBehaviorType.EXIT]: ExitBehaviors,
      },
      gridObjectFactory
    );
    this.gridMapFactory = new GridMapFactory(scene, gridTileFactory);
  }

  public createDungeon(levelKey: string, x: number, y: number): Dungeon {
    const gridMap = this.gridMapFactory.createGridMap('dungeon-tileset', 'dungeon-spritesheet', levelKey, x, y);
    return new Dungeon(gridMap);
  }
}
