import { DungeonFactory } from "../dungeon/dungeon-factory";
import { Dungeon } from "../dungeon/dungeon";
import { Direction } from "../constants/directions";
import { PhecsPlugin } from "phecs";
import { HeroPrefab } from "../prefabs/hero/prefab";
import { GridPositionComponent } from "../components/grid-position-component";
import { SpriteComponent } from "../components/sprite-component";
import { StateMachineComponent } from "../components/state-machine-component";
import { Entity } from "phecs/dist/entity";
import { MovementPlanner } from "../dungeon/movement-planner";
import { Viewport } from "../constants/viewport";
import { LevelManagerPlugin } from "../plugins/level-manager-plugin";

export class DungeonScene extends Phaser.Scene {
  private phecs!: PhecsPlugin;
  private levelManager!: LevelManagerPlugin;

  private dungeon!: Dungeon;
  private hero!: Entity;
  private controls!: Record<string, Phaser.Input.Keyboard.Key>;

  private levelNumber!: number;

  constructor() {
    super({ key: 'dungeon' });
  }

  init() {
    this.phecs.register.prefab('hero', HeroPrefab);

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => this.destroy());
  }

  create(data: any) {
    this.levelNumber = data.levelNumber;
    const dungeonFactory = new DungeonFactory(this);
    this.dungeon = dungeonFactory.createDungeon(this.levelManager.getLevelKey(this.levelNumber), 0, 0);

    const heroStartMarker = this.dungeon.getMarker('hero-start');

    this.hero = this.phecs.add.prefab('hero', {
      gridX: heroStartMarker.gridX,
      gridY: heroStartMarker.gridY
    }, heroStartMarker.worldX, heroStartMarker.worldY);

    this.controls = this.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.UP,
      'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
      'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
      'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
    }) as Record<string, Phaser.Input.Keyboard.Key>;
    this.controls.up.on(Phaser.Input.Keyboard.Events.DOWN, () => this.handleInput(Direction.UP));
    this.controls.down.on(Phaser.Input.Keyboard.Events.DOWN, () => this.handleInput(Direction.DOWN));
    this.controls.left.on(Phaser.Input.Keyboard.Events.DOWN, () => this.handleInput(Direction.LEFT));
    this.controls.right.on(Phaser.Input.Keyboard.Events.DOWN, () => this.handleInput(Direction.RIGHT));

    var { x, y, width, height } = this.calculateCameraBounds();
    this.cameras.main.setBounds(x, y, width, height);
    this.cameras.main.setBackgroundColor(0x25131A);
    this.cameras.main.startFollow(this.hero.getComponent(SpriteComponent).sprite);
    this.cameras.main.fadeIn(500);
  }

  destroy() {
    this.controls.up.off(Phaser.Input.Keyboard.Events.DOWN);
    this.controls.down.off(Phaser.Input.Keyboard.Events.DOWN);
    this.controls.left.off(Phaser.Input.Keyboard.Events.DOWN);
    this.controls.right.off(Phaser.Input.Keyboard.Events.DOWN);
  }

  private handleInput(direction: Direction) {
    if (this.hero.getComponent(StateMachineComponent).stateMachine.currentState.id === 'moving') return;

    const coordinates = this.hero.getComponent(GridPositionComponent);
    const cursor = this.dungeon.getCursor(coordinates.gridX, coordinates.gridY);
    cursor.move(direction);

    if (cursor.getTile().isWalkable()) {
      const movementTimeline = MovementPlanner.buildMovementTimeline(this.hero, direction, this.dungeon, this);
      movementTimeline.play();
    } else if (cursor.getTile().isObjective()) {
      if (this.levelManager.hasLevel(this.levelNumber + 1)) {
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
          this.scene.restart({ levelNumber: this.levelNumber + 1 });
        })
        this.cameras.main.fadeOut(500);
      } else {
        console.log('beat all the levels')
      }
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