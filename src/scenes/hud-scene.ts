import { ScoochDungeonScene } from "./scooch-dungeon-scene";

export class HUDScene extends ScoochDungeonScene {
  constructor() {
    super({ key: 'hud' });
  }

  create() {
    this.add.image(this.scale.width - 40, this.scale.height - 40, 'hud-restart')
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
  }
}