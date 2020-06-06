import { LEVELS_COUNT } from "../plugins/global/level-manager-plugin";
import { ScoochDungeonScene } from "./scooch-dungeon-scene";
import { Viewport } from "../constants/viewport";
import { SettingsDocument } from '../persistence/settings-document';
import { SCENE_KEYS } from '../constants/scene-keys';

export class PreloadScene extends ScoochDungeonScene {
  constructor() {
    super({ key: SCENE_KEYS.PRELOAD });
  }

  preload() {
    this.cameras.main.setBackgroundColor(0x3D253B);

    const centerX = Viewport.WIDTH / 2;
    const centerY = Viewport.HEIGHT / 2;

    const loaderWidth = 150;
    const loaderHeight = 40;
    const borderSize = 3;

    const loaderBorder = this.add.rectangle(centerX - loaderWidth / 2, centerY, loaderWidth, loaderHeight, 0xDA4E38)
      .setOrigin(0, 0.5)
    const loaderBar = this.add.rectangle(centerX - loaderWidth / 2 + borderSize, centerY, 0, loaderHeight - borderSize * 2, 0xEE8D2E)
      .setOrigin(0, 0.5)

    this.load.on(Phaser.Loader.Events.PROGRESS, (progress: number) => {
      const loaderBarWidth = progress * (loaderWidth - borderSize * 2);
      loaderBar.width = loaderBarWidth;
    });

    this.load.audio('coin', ['assets/sfx/coin.mp3', 'assets/sfx/coin.ogg']);
    this.load.audio('die', ['assets/sfx/die.mp3', 'assets/sfx/die.ogg']);
    this.load.audio('level-complete', ['assets/sfx/level-complete.mp3', 'assets/sfx/level-complete.ogg']);
    this.load.audio('level-reset', ['assets/sfx/level-reset.mp3', 'assets/sfx/level-reset.ogg']);

    this.load.audio('level-music', ['assets/music/level-music.mp3', 'assets/music/level-music.ogg'])
    this.load.audio('level-complete-music', ['assets/music/level-complete-music.mp3', 'assets/music/level-complete-music.ogg'])

    this.load.image('logo', 'assets/logo/scooch-dungeon-logo.png');
    this.load.bitmapFont('matchup-64', 'assets/fonts/matchup-64.png', 'assets/fonts/matchup-64.xml');
    this.load.bitmapFont('matchup-32', 'assets/fonts/matchup-32.png', 'assets/fonts/matchup-32.xml');
    this.load.bitmapFont('matchup-24', 'assets/fonts/matchup-24.png', 'assets/fonts/matchup-24.xml');

    this.load.spritesheet('hud-heart', 'assets/interface/hud-heart.png', { frameWidth: 32, frameHeight: 28 });
    this.load.image('hud-close', 'assets/interface/hud-close.png');
    this.load.image('hud-restart', 'assets/images/hud-restart.png');
    this.load.image('hud-pause', 'assets/interface/hud-pause.png');
    this.load.image('hud-button', 'assets/interface/hud-button.png');
    this.load.image('hud-button-inverse', 'assets/interface/hud-button-inverse.png');
    this.load.spritesheet('hud-volume', 'assets/interface/volume-indicator.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('swipe-indicator', 'assets/interface/swipe-indicator.png', { frameWidth: 32, frameHeight: 32 });
    this.load.animation('swipe-indicator-animations', 'assets/interface/swipe-indicator-animations.json');
    this.load.image('menubox', 'assets/interface/menubox.png');

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

    this.scene.start(SCENE_KEYS.TITLE);
  }
}
