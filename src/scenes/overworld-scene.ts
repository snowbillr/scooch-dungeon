import levels from '../../data/levels.json';
import { ScoochDungeonScene } from './scooch-dungeon-scene';
import { SCENE_KEYS } from '../constants/scene-keys';
import { ProgressDocument } from '../persistence/progress-document';
import { LevelGroup } from '../levels/level-group';
import { PlayerStatsDocument } from '../persistence/player-stats-documents';
import { Dungeon } from '../dungeon/dungeon';
import { Entity } from 'phecs/dist/entity';
import { HeroPrefab } from '../prefabs/hero/prefab';
import { SpriteComponent } from '../components/sprite-component';
import { GridMapFactory } from '../grid-maps/grid-map-factory';
import { GridMap } from '../grid-maps/grid-map';
import { Viewport } from '../constants/viewport';
import { GridTileFactory } from '../grid-maps/grid-tile-factory';
import { GridObjectFactory } from '../grid-maps/grid-object-factory';
import { GridTileBehaviorType } from '../grid-maps/grid-tile';
import { InputBehaviors } from '../overworld/behaviors/input-behaviors';
import { GridPositionComponent } from '../components/grid-position-component';

export class OverworldScene extends ScoochDungeonScene {
  public gridMap!: GridMap;
  public hero!: Entity;

  constructor() {
    super({ key: SCENE_KEYS.OVERWORLD });
  }

  init() {
    this.phecs.register.prefab('hero', HeroPrefab);
  }

  create() {
    const gridObjectFactory = new GridObjectFactory(this, []);
    const gridTileFactory = new GridTileFactory(
      this,
      rawProperties => {
        return {
          walkable: rawProperties.walkable.reduce((acc, w) => acc && w, true),
        };
      },
      {
        [GridTileBehaviorType.INPUT]: InputBehaviors,
        [GridTileBehaviorType.ENTER]: [],
        [GridTileBehaviorType.EXIT]: [],
      },
      gridObjectFactory
    );
    const gridMapFactory = new GridMapFactory(this, gridTileFactory);

    this.gridMap = gridMapFactory.createGridMap('overworld-tileset', 'overworld-tilesheet', 'overworld-000', 0, 0);

    const heroStartMarker = this.gridMap.getMarker('entrance');

    this.hero = this.phecs.add.prefab('hero', {
      gridX: heroStartMarker.gridX,
      gridY: heroStartMarker.gridY
    }, heroStartMarker.worldX, heroStartMarker.worldY);

    this.swipe.addListener(direction => {
      const coordinates = this.hero.getComponent(GridPositionComponent);
      const tile = this.gridMap.getTile(coordinates.gridX, coordinates.gridY);

      tile.runBehaviors(GridTileBehaviorType.INPUT, direction);
    });

    var { x, y, width, height } = this.calculateCameraBounds();
    this.cameras.main.setBounds(x, y, width, height);
    this.cameras.main.startFollow(this.hero.getComponent(SpriteComponent).sprite);
  }

  private calculateCameraBounds() {
    let x = 0;
    let y = 0;
    const width = this.gridMap.worldWidth;
    const height = this.gridMap.worldHeight;

    if (width < Viewport.WIDTH) {
      x = x - (Viewport.WIDTH - width) / 2;
    }

    if (height < Viewport.HEIGHT) {
      y = y - (Viewport.HEIGHT - height) / 2;
    }

    return { x, y, width, height };
  }
}
