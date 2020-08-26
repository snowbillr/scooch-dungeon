import bezier from 'bezier-easing';

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
import { DungeonHUDScene } from "./dungeon-hud-scene";
import { SCENE_KEYS } from '../constants/scene-keys';
import { Depths } from '../constants/depths';
import { ComboTracker } from '../lib/combo-tracker';
import { LevelGroup } from '../levels/level-group';
import { PlayerStatsDocument } from '../persistence/player-stats-documents';
import { GridMapFactory } from '../grid-maps/grid-map-factory';
import { GridTileBehaviorType } from '../grid-maps/grid-tile';

export class DungeonScene extends ScoochDungeonScene {
  public dungeon!: Dungeon;
  public hero!: Entity;

  public hud!: DungeonHUDScene;

  private comboTracker: ComboTracker;

  public queuedInput: Direction[];

  constructor() {
    super({ key: SCENE_KEYS.DUNGEON });

    this.comboTracker = new ComboTracker();
    this.queuedInput = [];
  }

  init() {
    this.phecs.register.prefab('hero', HeroPrefab);
  }

  create() {
    const level = this.levelSession.getCurrentLevel();

    const dungeonFactory = new DungeonFactory(this);
    this.dungeon = dungeonFactory.createDungeon(level.getKey(), 0, 0);

    const heroStartMarker = this.dungeon.gridMap.getMarker('hero-start');

    this.hero = this.phecs.add.prefab('hero', {
      gridX: heroStartMarker.gridX,
      gridY: heroStartMarker.gridY
    }, heroStartMarker.worldX, heroStartMarker.worldY);

    this.swipe.addListener(direction => {
      this.queueInput(direction);
    });

    var { x, y, width, height } = this.calculateCameraBounds();
    this.cameras.main.setBounds(x, y, width, height);
    this.cameras.main.setBackgroundColor(0x25131A);
    this.cameras.main.startFollow(this.hero.getComponent(SpriteComponent).sprite);
    this.cameras.main.fadeIn(500);

    const message = this.add.bitmapText(this.scale.width / 2, this.scale.height / 2, 'matchup-64', this.dungeon.message)
      .setMaxWidth(this.scale.width - 20)
      .setCenterAlign()
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(Depths.message);
    const messageWidth = message.getTextBounds().local.width;
    message.setX(this.scale.width + messageWidth);
    this.tweens.add({
      targets: message,
      props: {
        x: -messageWidth
      },
      duration: 2500,
      ease: bezier(.15, .85, .85, .15),
      onComplete: () => message.destroy()
    });

    this.sfx.playLevelMusic();

    this.scene.launch(SCENE_KEYS.DUNGEON_HUD, {
      totalCoins: this.dungeon.coinCount,
      maxHealth: this.persistence.getDocument<PlayerStatsDocument>('player-stats').getMaxHealth(),
      currentHealth: this.levelSession.getHealth(),
    });
    this.hud = this.scene.get(SCENE_KEYS.DUNGEON_HUD) as DungeonHUDScene;
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

  public queueInput(direction: Direction) {
    this.queuedInput.push(direction);

    if (this.hero.getComponent(StateMachineComponent).stateMachine.currentState.id === 'idle') {
      this.handleInput();
    }
  }

  public handleInput() {
    if (this.queuedInput.length === 0) return;

    const nextDirection = this.queuedInput.splice(0, 1)[0];

    const coordinates = this.hero.getComponent(GridPositionComponent);
    const tile = this.dungeon.gridMap.getTile(coordinates.gridX, coordinates.gridY);

    tile.runBehaviors(GridTileBehaviorType.INPUT, nextDirection);
  }

  public incrementCombo() {
    if (this.comboTracker.isMax()) return;

    this.comboTracker.increment();
    this.sfx.playComboSfx(this.comboTracker.getMultiplier(), this.comboTracker.getStep());
    this.hud.comboMeter.increaseTo(this.comboTracker.getMultiplier(), this.comboTracker.getStep())
  }

  public resetCombo() {
    if (this.comboTracker.getMultiplier() === 1 && this.comboTracker.getStep() === 0) {
      return;
    }

    this.comboTracker.reset();
    this.hud.comboMeter.reset();
  }

  private calculateCameraBounds() {
    let x = 0;
    let y = 0;
    const width = this.dungeon.gridMap.worldWidth;
    const height = this.dungeon.gridMap.worldHeight;

    if (width < Viewport.WIDTH) {
      x = x - (Viewport.WIDTH - width) / 2;
    }

    if (height < Viewport.HEIGHT) {
      y = y - (Viewport.HEIGHT - height) / 2;
    }

    return { x, y, width, height };
  }
}
