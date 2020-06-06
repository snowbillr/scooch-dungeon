import { ScoochDungeonScene } from "./scooch-dungeon-scene";
import { DungeonScene } from "./dungeon-scene";
import { SCENE_KEYS } from '../constants/scene-keys';
import { NinePatch } from '@koreez/phaser3-ninepatch';
import { ToggleVolumeButton } from '../hud/toggle-volume-button';
import { Button, ButtonStyle } from '../hud/button';
import { Heart, HeartValue } from '../hud/heart';

const VIEWPORT_PADDING = 60;

export class HUDScene extends ScoochDungeonScene {
  private collectedCoinsText!: Phaser.GameObjects.BitmapText;
  private totalCoinsText!: Phaser.GameObjects.BitmapText;
  private hearts!: Heart[];

  constructor() {
    super({ key: SCENE_KEYS.HUD });
  }

  create(levelData: any) {
    this.addPauseIcon();
    this.addRestartIcon();
    this.addCoinsIndicator(levelData.totalCoins);
    this.addHearts(levelData.maxHealth)
    // new Heart(this, VIEWPORT_PADDING, VIEWPORT_PADDING)
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
    this.add.image(VIEWPORT_PADDING, this.scale.height - VIEWPORT_PADDING, 'hud-pause')
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.scene.pause(SCENE_KEYS.DUNGEON);

        const menuX = this.scale.width / 2;
        const menuY = this.scale.height / 2;

        const backDrop = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0.5)
          .setOrigin(0)
          .setAlpha(0);

        const pauseMenu = (this.add as any).ninePatch(menuX, -300, 250, 300, 'menubox', null, {
          top: 16,
          bottom: 16,
          left: 16,
          right: 16
        }) as NinePatch;

        pauseMenu.add([
          this.add.bitmapText(0, -125, 'matchup-32', 'Paused').setOrigin(0.5),
          this.add.image(125 - 12, -150 + 12, 'hud-close')
            .setInteractive()
            .on(Phaser.Input.Events.POINTER_DOWN, () => {
              this.tweens.add({
                targets: pauseMenu,
                props: {
                  y: -300
                },
                duration: 400,
                ease: Phaser.Math.Easing.Cubic.In,
                onComplete: () => {
                  pauseMenu.destroy();
                }
              });
              this.tweens.add({
                targets: backDrop,
                props: {
                  alpha: 0
                },
                duration: 400,
                onComplete: () => {
                  backDrop.destroy();
                }
              });

              this.scene.resume(SCENE_KEYS.DUNGEON);
            }),
          new Button(this, 0, -50, ButtonStyle.BACKGROUND,
              this.add.bitmapText(0, 0, 'matchup-24', 'Quit to title').setOrigin(0.5),
              () => {
                this.sfx.pauseLevelMusic();

                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                  this.scene.stop();
                  this.scene.stop(SCENE_KEYS.DUNGEON);
                  this.scene.start(SCENE_KEYS.TITLE);
                });
                this.cameras.main.fadeOut(1000);
              }).gameObject,
          new ToggleVolumeButton(this, 0, 100).gameObject
        ]);

        this.tweens.add({
          targets: pauseMenu,
          props: {
            y: menuY
          },
          duration: 400,
          ease: Phaser.Math.Easing.Cubic.Out
        });
        this.tweens.add({
          targets: backDrop,
          props: {
            alpha: 1
          },
          duration: 400
        })
      });
  }

  private addRestartIcon() {
    new Button(this, this.scale.width - VIEWPORT_PADDING, this.scale.height - VIEWPORT_PADDING, ButtonStyle.NONE, 'hud-restart', () => {
      (this.scene.get(SCENE_KEYS.DUNGEON) as DungeonScene).resetLevel();
    });
  }

  private addCoinsIndicator(totalCoins: number) {
    const x = this.scale.width - VIEWPORT_PADDING;
    const y = VIEWPORT_PADDING;

    if (totalCoins > 0) {
      this.add.image(x - 40, y, 'coin')
        .setOrigin(0.5)
      this.collectedCoinsText = this.add.bitmapText(x - 20, y - 3, 'matchup-32', '0')
        .setOrigin(0, 0.5);
      this.add.bitmapText(x, y - 3, 'matchup-32', '/')
        .setOrigin(0, 0.5);
      this.totalCoinsText = this.add.bitmapText(x + 20, y - 3, 'matchup-32', `${totalCoins}`)
        .setOrigin(0, 0.5);
    }
  }

  private addHearts(maxHealth: number) {
    const fullHearts = Math.floor(maxHealth);
    const halfHearts = Math.ceil(maxHealth - fullHearts);

    const startX = VIEWPORT_PADDING;
    const stepX = 32 + 8;
    const y = VIEWPORT_PADDING;

    this.hearts = [];

    for (let i = 0; i < fullHearts; i++) {
      this.hearts.push(new Heart(this, startX + stepX * i, y, HeartValue.FULL))
    }

    for (let i = fullHearts; i < halfHearts + fullHearts; i++) {
      this.hearts.push(new Heart(this, startX + stepX * i, y, HeartValue.HALF))
    }
  }
}
