import { LEVELS_COUNT } from "../plugins/global/level-manager-plugin";
import { ScoochDungeonScene } from "./scooch-dungeon-scene";

export class PreloadScene extends ScoochDungeonScene {
  constructor() {
    super({ key: 'preload' });
  }

  preload() {
    this.load.audio('coin', ['assets/sfx/coin.mp3', 'assets/sfx/coin.ogg']);
    this.load.audio('die', ['assets/sfx/die.mp3', 'assets/sfx/die.ogg']);
    this.load.audio('level-complete', ['assets/sfx/level-complete.mp3', 'assets/sfx/level-complete.ogg']);
    this.load.audio('level-reset', ['assets/sfx/level-reset.mp3', 'assets/sfx/level-reset.ogg']);

    this.load.audio('level-music', ['assets/music/level-music.mp3', 'assets/music/level-music.ogg'])
    this.load.audio('level-complete-music', ['assets/music/level-complete-music.mp3', 'assets/music/level-complete-music.ogg'])

    this.load.image('logo', 'assets/logo/scooch-dungeon-logo.png');
    this.load.bitmapFont('matchup-64', 'assets/fonts/matchup-64.png', 'assets/fonts/matchup-64.xml');
    this.load.bitmapFont('matchup-32', 'assets/fonts/matchup-32.png', 'assets/fonts/matchup-32.xml');

    this.load.image('hud-restart', 'assets/images/hud-restart.png');

    this.load.image('dungeon-spritesheet', 'assets/maps/dungeon-spritesheet.png');
    this.load.spritesheet('objective', 'assets/objects/objective.png', { frameWidth: 32, frameHeight: 32 });
    this.load.animation('objective-animations', 'assets/objects/objective-animations.json');
    this.load.spritesheet('coin', 'assets/objects/coin.png', { frameWidth: 32, frameHeight: 32 });
    this.load.animation('coin-animations', 'assets/objects/coin-animations.json');
    this.load.image('rock', 'assets/objects/rock.png');

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