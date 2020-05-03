import { ScoochDungeonScene } from "./scooch-dungeon-scene";

const VIEWPORT_PADDING = 60;

export class HUDScene extends ScoochDungeonScene {
  constructor() {
    super({ key: 'hud' });
  }

  create() {
    this.add.image(this.scale.width - VIEWPORT_PADDING, this.scale.height - VIEWPORT_PADDING, 'hud-restart')
      .setOrigin(0.5)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.sfx.pauseLevelMusic();
        this.sfx.playResetSfx();

        const dungeonScene = this.scene.get('dungeon');
        
        dungeonScene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
          dungeonScene.scene.restart();
        });
        dungeonScene.cameras.main.fadeOut(1000);
      });

    this.add.image(VIEWPORT_PADDING, this.scale.height - VIEWPORT_PADDING + 3, 'coin')
      .setOrigin(0.5)
    const text = this.add.bitmapText(VIEWPORT_PADDING + 20, this.scale.height - VIEWPORT_PADDING, 'matchup-32', '0 / 3')
      .setOrigin(0, 0.5)
  }
}