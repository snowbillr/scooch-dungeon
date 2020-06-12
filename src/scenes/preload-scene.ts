import { LEVELS_COUNT } from "../plugins/global/level-manager-plugin";
import { ScoochDungeonScene } from "./scooch-dungeon-scene";
import { Viewport } from "../constants/viewport";
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

    this.load.pack('sfx-pack', 'assets/sfx/pack.json');
    this.load.pack('music-pack', 'assets/music/pack.json');
    this.load.pack('objects-pack', 'assets/objects/pack.json');
    this.load.pack('font-pack', 'assets/fonts/pack.json');
    this.load.pack('interface-pack', 'assets/interface/pack.json');

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

    this.scene.start(SCENE_KEYS.TITLE);
  }
}
