import { DungeonFactory } from "../dungeon/dungeon-factory";
import { Dungeon } from "../dungeon/dungeon";
import { Direction } from "../constants/directions";
import { HeroPrefab } from "../prefabs/hero/prefab";
import { GridPositionComponent } from "../components/grid-position-component";
import { SpriteComponent } from "../components/sprite-component";
import { StateMachineComponent } from "../components/state-machine-component";
import { Entity } from "phecs/dist/entity";
import { Viewport } from "../constants/viewport";
import { ScoochDungeonScene } from "./scooch-dungeon-scene";
import { HUDScene } from "./hud-scene";
import { DungeonTileBehaviorType } from "../dungeon/dungeon-tile";
import { SCENE_KEYS } from '../constants/scene-keys';

export class DungeonScene extends ScoochDungeonScene {
  public dungeon!: Dungeon;
  public hero!: Entity;

  public hud!: HUDScene;

  public queuedInput?: Direction;

  constructor() {
    super({ key: SCENE_KEYS.DUNGEON });
  }

  init() {
    this.phecs.register.prefab('hero', HeroPrefab);
  }

  create() {
    const dungeonFactory = new DungeonFactory(this);
    this.dungeon = dungeonFactory.createDungeon(this.levelManager.getCurrentLevelKey(), 0, 0);

    const heroStartMarker = this.dungeon.getMarker('hero-start');

    this.hero = this.phecs.add.prefab('hero', {
      gridX: heroStartMarker.gridX,
      gridY: heroStartMarker.gridY
    }, heroStartMarker.worldX, heroStartMarker.worldY);

    this.swipe.addListener(direction => {
      this.handleInput(direction);
    });

    var { x, y, width, height } = this.calculateCameraBounds();
    this.cameras.main.setBounds(x, y, width, height);
    this.cameras.main.setBackgroundColor(0x25131A);
    this.cameras.main.startFollow(this.hero.getComponent(SpriteComponent).sprite);
    this.cameras.main.fadeIn(500);

    this.sfx.playLevelMusic();

    this.scene.launch(SCENE_KEYS.HUD, { totalCoins: this.dungeon.coinCount });
    this.hud = this.scene.get(SCENE_KEYS.HUD) as HUDScene;
  }

  public resetLevel() {
    this.dungeon.stats.reset();
    this.sfx.pauseLevelMusic();
    this.sfx.playResetSfx();

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.stop();
      this.scene.restart();
    });
    this.cameras.main.fadeOut(1000);
  }

  public handleInput(direction: Direction) {
    if (this.hero.getComponent(StateMachineComponent).stateMachine.currentState.id === 'moving') {
      this.queuedInput = direction;
    } else {
      const coordinates = this.hero.getComponent(GridPositionComponent);
      const cursor = this.dungeon.getCursor(coordinates.gridX, coordinates.gridY);

      const tile = cursor.getTile();

      tile.runBehaviors(DungeonTileBehaviorType.INPUT, direction, this);
    }
  }

  private calculateCameraBounds() {
    let x = 0;
    let y = 0;
    const width = this.dungeon.worldWidth;
    const height = this.dungeon.worldHeight;

    if (width < Viewport.WIDTH) {
      x = x - (Viewport.WIDTH - width) / 2;
    }

    if (height < Viewport.HEIGHT) {
      y = y - (Viewport.HEIGHT - height) / 2;
    }

    return { x, y, width, height };
  }
}
