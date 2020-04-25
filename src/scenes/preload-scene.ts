import { LEVELS_COUNT } from "../plugins/level-manager-plugin";
import { PersistencePlugin } from "../plugins/persistence-plugin";
import { ScoochDungeonScene } from "./scooch-dungeon-scene";

export class PreloadScene extends ScoochDungeonScene {
  constructor() {
    super({ key: 'preload' });
  }

  preload() {
    this.load.image('logo', 'assets/logo/scooch-dungeon-logo.png');
    this.load.bitmapFont('matchup-64', 'assets/fonts/matchup-64.png', 'assets/fonts/matchup-64.xml');

    this.load.image('hud-restart', 'assets/images/hud-restart.png');

    this.load.image('dungeon-spritesheet', 'assets/maps/dungeon-spritesheet.png');

    for (let i = 1; i <= LEVELS_COUNT; i++) {
      const levelKey = String(i).padStart(3, '0');
      this.load.tilemapTiledJSON(`level-${levelKey}`, `assets/levels/${levelKey}.json`);
    }

    this.load.spritesheet('hero', 'assets/characters/hero/spritesheet.png', { frameWidth: 32, frameHeight: 56 });
    this.load.animation('hero-animations', 'assets/characters/hero/animations.json');
  }

  create() {
    this.persistence.read();

    this.scene.start('title');
  }
}