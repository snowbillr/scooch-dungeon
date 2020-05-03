import { ScoochDungeonScene } from "./scooch-dungeon-scene";
import { DungeonScene } from "./dungeon-scene";

const VIEWPORT_PADDING = 60;

export class HUDScene extends ScoochDungeonScene {
  private collectedCoinsText!: Phaser.GameObjects.BitmapText;
  private totalCoinsText!: Phaser.GameObjects.BitmapText;

  constructor() {
    super({ key: 'hud' });
  }

  create(data: any) {
    const dungeonScene = this.scene.get('dungeon') as DungeonScene;

    this.add.image(this.scale.width - VIEWPORT_PADDING, this.scale.height - VIEWPORT_PADDING, 'hud-restart')
      .setOrigin(0.5)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.sfx.pauseLevelMusic();
        this.sfx.playResetSfx();

        dungeonScene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
          this.scene.stop();
          dungeonScene.scene.restart();
        });
        dungeonScene.cameras.main.fadeOut(1000);
      });

    this.add.image(VIEWPORT_PADDING, this.scale.height - VIEWPORT_PADDING + 3, 'coin')
      .setOrigin(0.5)
    this.collectedCoinsText = this.add.bitmapText(VIEWPORT_PADDING + 20, this.scale.height - VIEWPORT_PADDING, 'matchup-32', '0')
      .setOrigin(0, 0.5);
    this.add.bitmapText(VIEWPORT_PADDING + 40, this.scale.height - VIEWPORT_PADDING, 'matchup-32', '/')
      .setOrigin(0, 0.5);
    this.totalCoinsText = this.add.bitmapText(VIEWPORT_PADDING + 60, this.scale.height - VIEWPORT_PADDING, 'matchup-32', data.totalCoins)
      .setOrigin(0, 0.5); 
  }

  setTotalCoins(totalCoins: number) {
    this.totalCoinsText.setText(`${totalCoins}`);
  }

  resetCollectedCoins() {
    this.totalCoinsText.setText(`${0}`);
  }

  incrementCollectedCoins() {
    const currentCoins = Number(this.collectedCoinsText.text);
    this.collectedCoinsText.setText(`${currentCoins + 1}`);
  }
}