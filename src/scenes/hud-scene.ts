import { ScoochDungeonScene } from "./scooch-dungeon-scene";
import { DungeonScene } from "./dungeon-scene";
import { SettingsDocument } from '../persistence/settings-document';
import { SCENE_KEYS } from '../constants/scene-keys';
import { NinePatch } from '@koreez/phaser3-ninepatch';
import { ToggleVolumeButton } from '../hud/toggle-volume-button';

const VIEWPORT_PADDING = 60;

export class HUDScene extends ScoochDungeonScene {
  private collectedCoinsText!: Phaser.GameObjects.BitmapText;
  private totalCoinsText!: Phaser.GameObjects.BitmapText;

  private pauseMenu!: NinePatch;

  constructor() {
    super({ key: SCENE_KEYS.HUD });
  }

  create(levelData: any) {
    this.addPauseIcon();

    this.addRestartIcon();

    this.addCoinsIndicator(levelData);
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

  private addPauseIcon() {
    this.add.image(this.scale.width - VIEWPORT_PADDING, VIEWPORT_PADDING, 'hud-pause')
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.scene.pause(SCENE_KEYS.DUNGEON);

        const menuX = this.scale.width / 2;
        const menuY = this.scale.height / 2;

        const backDrop = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0.5)
          .setOrigin(0);

        // show pause menu
        this.pauseMenu = (this.add as any).ninePatch(menuX, menuY, 250, 300, 'menubox', null, {
          top: 16,
          bottom: 16,
          left: 16,
          right: 16
        }) as NinePatch;

        this.pauseMenu.add([
          this.add.bitmapText(0, -125, 'matchup-32', 'Paused').setOrigin(0.5),
          this.add.image(125, -150, 'hud-close')
            .setInteractive()
            .on(Phaser.Input.Events.POINTER_DOWN, () => {
              this.pauseMenu.destroy();
              backDrop.destroy();

              this.scene.resume(SCENE_KEYS.DUNGEON);
            }),
          this.add.bitmapText(0, -50, 'matchup-24', 'Quit').setOrigin(0.5)
            .setInteractive()
            .on(Phaser.Input.Events.POINTER_DOWN, () => {
              this.sfx.pauseLevelMusic();

              this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.stop();
                this.scene.stop(SCENE_KEYS.DUNGEON);
                this.scene.start(SCENE_KEYS.TITLE);
              });
              this.cameras.main.fadeOut(1000);
            }),
          new ToggleVolumeButton(this, 0, 100).gameObject
        ]);
      });
  }

  private addRestartIcon() {
    this.add.image(this.scale.width - VIEWPORT_PADDING, this.scale.height - VIEWPORT_PADDING, 'hud-restart')
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        (this.scene.get(SCENE_KEYS.DUNGEON) as DungeonScene).resetLevel();
      });
  }

  private addCoinsIndicator(levelData: any) {
    if (levelData.totalCoins > 0) {
      this.add.image(VIEWPORT_PADDING, this.scale.height - VIEWPORT_PADDING + 3, 'coin')
        .setOrigin(0.5)
      this.collectedCoinsText = this.add.bitmapText(VIEWPORT_PADDING + 20, this.scale.height - VIEWPORT_PADDING, 'matchup-32', '0')
        .setOrigin(0, 0.5);
      this.add.bitmapText(VIEWPORT_PADDING + 40, this.scale.height - VIEWPORT_PADDING, 'matchup-32', '/')
        .setOrigin(0, 0.5);
      this.totalCoinsText = this.add.bitmapText(VIEWPORT_PADDING + 60, this.scale.height - VIEWPORT_PADDING, 'matchup-32', levelData.totalCoins)
        .setOrigin(0, 0.5);
    }
  }
}
