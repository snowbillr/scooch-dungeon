import { ScoochDungeonScene } from "./scooch-dungeon-scene";
import { DungeonScene } from "./dungeon-scene";
import { SettingsDocument } from '../persistence/settings-document';

const VIEWPORT_PADDING = 60;

export class HUDScene extends ScoochDungeonScene {
  private collectedCoinsText!: Phaser.GameObjects.BitmapText;
  private totalCoinsText!: Phaser.GameObjects.BitmapText;

  constructor() {
    super({ key: 'hud' });
  }

  create(data: any) {
    const dungeonScene = this.scene.get('dungeon') as DungeonScene;
    const settings = this.persistence.getDocument<SettingsDocument>('settings');

    const volumeIndicator = this.add.sprite(VIEWPORT_PADDING, VIEWPORT_PADDING, 'hud-volume')
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        const newMuteValue = !this.sound.mute;
        this.sound.mute = newMuteValue;
        if (newMuteValue) {
          volumeIndicator.setFrame(1);
        } else {
          volumeIndicator.setFrame(0);
        }

        settings.setMuted(newMuteValue);
        this.persistence.store();
      }).setFrame(settings.getMuted() ? 1 : 0)

    this.add.image(this.scale.width - VIEWPORT_PADDING, this.scale.height - VIEWPORT_PADDING, 'hud-restart')
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        dungeonScene.resetLevel();
      });

    if (data.totalCoins > 0) {
      this.add.image(VIEWPORT_PADDING, this.scale.height - VIEWPORT_PADDING + 3, 'coin')
        .setOrigin(0.5)
      this.collectedCoinsText = this.add.bitmapText(VIEWPORT_PADDING + 20, this.scale.height - VIEWPORT_PADDING, 'matchup-32', '0')
        .setOrigin(0, 0.5);
      this.add.bitmapText(VIEWPORT_PADDING + 40, this.scale.height - VIEWPORT_PADDING, 'matchup-32', '/')
        .setOrigin(0, 0.5);
      this.totalCoinsText = this.add.bitmapText(VIEWPORT_PADDING + 60, this.scale.height - VIEWPORT_PADDING, 'matchup-32', data.totalCoins)
        .setOrigin(0, 0.5);
    }
  }

  setTotalCoins(totalCoins: number) {
    this.totalCoinsText.setText(`${totalCoins}`);
  }

  resetCollectedCoins() {
    this.totalCoinsText.setText(`${0}`);
  }

  setCollectedCoins(coins: number) {
    this.collectedCoinsText.setText(`${coins}`);
  }
}
