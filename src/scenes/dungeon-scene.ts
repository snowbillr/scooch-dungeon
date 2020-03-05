import { Depths } from "../constants/depths";
import { DungeonCreator } from "../dungeon/dungeon-creator";
import { Dungeon } from "../dungeon/dungeon";
import { Direction } from "../constants/directions";

export class DungeonScene extends Phaser.Scene {
  private dungeon!: Dungeon;

  preload() {
    this.load.image('dungeon-spritesheet', 'assets/maps/dungeon-spritesheet.png');
    this.load.tilemapTiledJSON('level-001', 'assets/levels/001.json');

    this.load.spritesheet('hero', 'assets/characters/hero/spritesheet.png', { frameWidth: 32, frameHeight: 56 });
    this.load.animation('hero-animations', 'assets/characters/hero/animations.json');
  }

  create() {
    this.cameras.main.setBackgroundColor(0xCCCCCC);

    const dungeonCreator = new DungeonCreator(this, 'level-001');
    dungeonCreator.load();
    this.dungeon = dungeonCreator.createDungeon(100, 100);

    const heroStartWorldCoordinates = dungeonCreator.getHeroStartWorldPosition();
    const hero = this.add.sprite(heroStartWorldCoordinates.x, heroStartWorldCoordinates.y, 'hero');
    hero.setDepth(Depths.hero);

    const controls = this.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.UP,
      'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
      'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
      'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
    }) as Record<string, Phaser.Input.Keyboard.Key>;
    controls.up.on(Phaser.Input.Keyboard.Events.DOWN, () => this.dungeon.moveHero(Direction.UP));
    controls.down.on(Phaser.Input.Keyboard.Events.DOWN, () => this.dungeon.moveHero(Direction.DOWN));
    controls.left.on(Phaser.Input.Keyboard.Events.DOWN, () => this.dungeon.moveHero(Direction.LEFT));
    controls.right.on(Phaser.Input.Keyboard.Events.DOWN, () => this.dungeon.moveHero(Direction.RIGHT));
  }
}