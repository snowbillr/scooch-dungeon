import { DungeonFactory } from "../dungeon/dungeon-factory";
import { Dungeon } from "../dungeon/dungeon";
import { Direction } from "../constants/directions";
import { HeroPrefab } from "../prefabs/hero/prefab";
import { GridPositionComponent } from "../components/grid-position-component";
import { SpriteComponent } from "../components/sprite-component";
import { StateMachineComponent } from "../components/state-machine-component";
import { Entity } from "phecs/dist/entity";
import { Viewport } from "../constants/viewport";
import { ProgressDocument } from "../persistence/progress-document";
import { ScoochDungeonScene } from "./scooch-dungeon-scene";

export class DungeonScene extends ScoochDungeonScene {
  public dungeon!: Dungeon;
  public hero!: Entity;
  public levelNumber!: number;

  constructor() {
    super({ key: 'dungeon' });
  }

  init() {
    this.phecs.register.prefab('hero', HeroPrefab);
  }

  create(data: any) {
    this.add.image(this.scale.width - 40, this.scale.height - 40, 'hud-restart')
      .setScrollFactor(0)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
          this.scene.restart(data);
        });
        this.cameras.main.fadeOut(500);
      });

    this.levelNumber = data.levelNumber;
    const dungeonFactory = new DungeonFactory(this);
    this.dungeon = dungeonFactory.createDungeon(this.levelManager.getLevelKey(this.levelNumber), 0, 0);

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
  }

  private handleInput(direction: Direction) {
    if (this.hero.getComponent(StateMachineComponent).stateMachine.currentState.id === 'moving') return;

    const coordinates = this.hero.getComponent(GridPositionComponent);
    const cursor = this.dungeon.getCursor(coordinates.gridX, coordinates.gridY);

    const tile = cursor.getTile();

    tile.inputBehaviors.forEach(behavior => behavior.run(direction, tile, this));
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