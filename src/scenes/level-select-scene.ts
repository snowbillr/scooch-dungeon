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

export class LevelSelectScene extends ScoochDungeonScene {
  public gridMap!: GridMap;
  public hero!: Entity;

  constructor() {
    super({ key: SCENE_KEYS.LEVEL_SELECT });
  }

  init() {
    this.phecs.register.prefab('hero', HeroPrefab);
  }

  create() {
    const gridMapFactory = new GridMapFactory(this);
    this.gridMap = gridMapFactory.createGridMap('overworld-000', 0, 0);

    const heroStartMarker = this.gridMap.getMarker('entrance');

    this.hero = this.phecs.add.prefab('hero', {
      gridX: heroStartMarker.gridX,
      gridY: heroStartMarker.gridY
    }, heroStartMarker.worldX, heroStartMarker.worldY);


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
