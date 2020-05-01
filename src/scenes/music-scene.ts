import { ScoochDungeonScene } from "./scooch-dungeon-scene";

export class MusicScene extends ScoochDungeonScene {
  private levelMusic!: Phaser.Sound.BaseSound;

  constructor() {
    super({ key: 'music' });
  }

  init() {
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, this.destroy, this);
  }

  create() {
    this.levelMusic = this.sound.add('level-music', { loop: true });
  }

  destroy() {
    this.levelMusic.destroy();
  }

  playLevelMusic() {
    if (this.levelMusic.isPlaying) return;

    if (this.levelMusic.isPaused) {
      this.levelMusic.resume();
    } else {
      this.levelMusic.play();
    }
  }

  pauseLevelMusic() {
    this.levelMusic.pause();
  }
}