import { Dungeon } from './dungeon';
import { DungeonScene } from '../scenes/dungeon-scene';
import { GridMapFactory } from '../grid-maps/grid-map-factory';
import { GridTileFactory } from '../grid-maps/grid-tile-factory';
import { GridObjectFactory } from '../grid-maps/grid-object-factory';
import { objectsList } from './objects/objects-list';


export class DungeonFactory {
  private gridMapFactory: GridMapFactory;

  constructor(scene: DungeonScene) {
    const gridObjectFactory = new GridObjectFactory(scene, objectsList);
    const gridTileFactory = new GridTileFactory(
      scene,
      rawProperties => {
        return {
          walkable: rawProperties.walkable.reduce((acc, w) => acc && w, true),
          objective: rawProperties.objective.reduce((acc, o) => acc || o, false),
        }
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
