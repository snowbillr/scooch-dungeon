import { Dungeon } from './dungeon';
import { DungeonScene } from '../scenes/dungeon-scene';
import { GridMapFactory } from '../grid-maps/grid-map-factory';
import { GridTileFactory } from '../grid-maps/grid-tile-factory';
import { GridObjectFactory } from '../grid-maps/grid-object-factory';
import { objectsList } from './objects/objects-list';


export class DungeonFactory {
  private gridMapFactory: GridMapFactory<DungeonScene>;

  constructor(private scene: DungeonScene) {
    this.gridMapFactory = new GridMapFactory(scene, new GridTileFactory(scene, new GridObjectFactory(scene, objectsList)));
  }

  public createDungeon(levelKey: string, x: number, y: number): Dungeon {
    const gridMap = this.gridMapFactory.createGridMap('dungeon-tileset', 'dungeon-spritesheet', levelKey, x, y);
    return new Dungeon(gridMap);
  }
}
