import { Depths } from "../constants/depths";
import { DungeonCreator } from "../dungeon/dungeon-creator";
import { Dungeon } from "../dungeon/dungeon";
import { Direction } from "../constants/directions";
import { PhecsPlugin } from "phecs";
import { HeroPrefab } from "../prefabs/hero/prefab";
import { GridPositionComponent } from "../components/grid-position-component";
import { SpriteComponent } from "../components/sprite-component";
import { StateMachineComponent } from "../components/state-machine-component";
import { Entity } from "phecs/dist/entity";
import { MovementPlanner } from "../dungeon/movement-planner";

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

    this.load.spritesheet('hero', 'assets/characters/hero/spritesheet.png', { frameWidth: 32, frameHeight: 56 });
    this.load.animation('hero-animations', 'assets/characters/hero/animations.json');
  }

  create() {
    const dungeonCreator = new DungeonCreator(this, 'level-001');
    dungeonCreator.load();
    this.dungeon = dungeonCreator.createDungeon(100, 100);

    const heroStartGridPosition = dungeonCreator.getHeroStartGridPosition();
    const heroStartWorldCoordinates = dungeonCreator.getHeroStartWorldPosition();
    this.hero = this.phecs.add.prefab('hero', {
      gridX: heroStartGridPosition.x,
      gridY: heroStartGridPosition.y
    }, heroStartWorldCoordinates.x, heroStartWorldCoordinates.y);

    const controls = this.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.UP,
      'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
      'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
      'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
    }) as Record<string, Phaser.Input.Keyboard.Key>;
    controls.up.on(Phaser.Input.Keyboard.Events.DOWN, () => this.moveHero(Direction.UP));
    controls.down.on(Phaser.Input.Keyboard.Events.DOWN, () => this.moveHero(Direction.DOWN));
    controls.left.on(Phaser.Input.Keyboard.Events.DOWN, () => this.moveHero(Direction.LEFT));
    controls.right.on(Phaser.Input.Keyboard.Events.DOWN, () => this.moveHero(Direction.RIGHT));

    this.cameras.main.setBackgroundColor(0xCCCCCC);
    this.cameras.main.startFollow(this.hero.getComponent(SpriteComponent).sprite);
  }

  private moveHero(direction: Direction) {
    const heroGridPosition = this.hero.getComponent(GridPositionComponent);
    const dungeonTile = this.dungeon.getTile(heroGridPosition.gridX, heroGridPosition.gridY);

    const movementTimeline = MovementPlanner.buildMovementTimeline(this.hero, direction, dungeonTile, this.dungeon, this);
    console.log(movementTimeline)
    movementTimeline.play();

    // dungeonTile.directionInputEffect?.(direction, this.hero, this.dungeon, this);
  }
}