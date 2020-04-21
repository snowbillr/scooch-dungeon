import { Depths } from "../constants/depths";
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

export class DungeonScene extends Phaser.Scene {
  private phecs!: PhecsPlugin;

  private dungeon!: Dungeon;
  private hero!: Entity;

  init() {
    this.phecs.register.prefab('hero', HeroPrefab);
  }

  preload() {
    this.load.image('dungeon-spritesheet', 'assets/maps/dungeon-spritesheet.png');
    this.load.tilemapTiledJSON('level-001', 'assets/levels/001.json');
    this.load.tilemapTiledJSON('level-002', 'assets/levels/002.json');

    this.load.spritesheet('hero', 'assets/characters/hero/spritesheet.png', { frameWidth: 32, frameHeight: 56 });
    this.load.animation('hero-animations', 'assets/characters/hero/animations.json');
  }

  create() {
    const dungeonCreator = new DungeonFactory(this);
    this.dungeon = dungeonCreator.createDungeon('level-002', 0, 0);

    const heroStartMarker = this.dungeon.getMarker('hero-start');

    this.hero = this.phecs.add.prefab('hero', {
      gridX: heroStartMarker.gridX,
      gridY: heroStartMarker.gridY
    }, heroStartMarker.worldX, heroStartMarker.worldY);

    const controls = this.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.UP,
      'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
      'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
      'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
    }) as Record<string, Phaser.Input.Keyboard.Key>;
    controls.up.on(Phaser.Input.Keyboard.Events.DOWN, () => this.handleInput(Direction.UP));
    controls.down.on(Phaser.Input.Keyboard.Events.DOWN, () => this.handleInput(Direction.DOWN));
    controls.left.on(Phaser.Input.Keyboard.Events.DOWN, () => this.handleInput(Direction.LEFT));
    controls.right.on(Phaser.Input.Keyboard.Events.DOWN, () => this.handleInput(Direction.RIGHT));

    var { x, y, width, height } = this.calculateCameraBounds();
    this.cameras.main.setBounds(x, y, width, height);
    this.cameras.main.setBackgroundColor(0x25131A);
    this.cameras.main.startFollow(this.hero.getComponent(SpriteComponent).sprite);
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
      console.log('win');
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