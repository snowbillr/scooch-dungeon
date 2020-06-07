import { ScoochDungeonScene } from "./scooch-dungeon-scene";
import { DungeonScene } from "./dungeon-scene";
import { SCENE_KEYS } from '../constants/scene-keys';
import { NinePatch } from '@koreez/phaser3-ninepatch';
import { ToggleVolumeButton } from '../hud/toggle-volume-button';
import { Button, ButtonStyle } from '../hud/button';
import { Heart, HeartValue } from '../hud/heart';
import { Viewport } from '../constants/viewport';
import { ComboMeter } from '../hud/combo-meter';

const VIEWPORT_PADDING = 60;

export class HUDScene extends ScoochDungeonScene {
  private collectedCoinsText!: Phaser.GameObjects.BitmapText;
  private totalCoinsText!: Phaser.GameObjects.BitmapText;
  private hearts!: Heart[];
  private comboMeter!: ComboMeter;

  constructor() {
    super({ key: SCENE_KEYS.HUD });
  }

  create(levelData: any) {
    this.addPauseIcon();
    this.addRestartIcon();
    this.addCoinsIndicator(levelData.totalCoins);
    this.addHearts(levelData.maxHealth)
    this.addComboMeter();
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

  updateHealth(currentHealth: number, maxHealth: number) {
    const { fullHearts, halfHearts, emptyHearts } = this.calculateHearts(currentHealth, maxHealth);

    for (let i = 0; i < fullHearts; i++) {
      this.hearts[i].setValue(HeartValue.FULL);
    }
    for (let i = fullHearts; i < fullHearts + halfHearts; i++) {
      this.hearts[i].setValue(HeartValue.HALF);
    }
    for (let i = fullHearts + halfHearts; i < fullHearts + halfHearts + emptyHearts; i++) {
      this.hearts[i].setValue(HeartValue.EMPTY);
    }
  }

  public stepCombo() {
    this.comboMeter.step();
  }

  public clearComboAmount() {
    this.comboMeter.reset();
  }

  private addPauseIcon() {
    new Button(
      this,
      VIEWPORT_PADDING,
      this.scale.height - VIEWPORT_PADDING,
      ButtonStyle.NONE,
      'hud-pause',
      () => {
        if (this.scene.isPaused(SCENE_KEYS.DUNGEON)) return;

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
            .on(Phaser.Input.Events.POINTER_UP, () => {
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
      }
    );
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
   const { fullHearts, halfHearts, emptyHearts } = this.calculateHearts(maxHealth, maxHealth);

    const startX = VIEWPORT_PADDING;
    const stepX = 32 + 8;
    const y = VIEWPORT_PADDING;

    this.hearts = Array.from({ length: fullHearts + halfHearts + emptyHearts }, (v, i) => {
      return new Heart(this, startX + stepX * i, y);
    });

    this.updateHealth(maxHealth, maxHealth);
  }

  private calculateHearts(health: number, maxHealth: number) {
    const fullHearts = Math.floor(health);
    const halfHearts = Math.ceil(health - fullHearts);
    const emptyHearts = maxHealth - halfHearts - fullHearts;

    return {
      fullHearts,
      halfHearts,
      emptyHearts
    };
  }

  /*
  private addComboText() {
    this.comboText = this.add.bitmapText(Viewport.WIDTH / 2 - 30, VIEWPORT_PADDING + 50, 'matchup-64-white', 'COMBO')
      .setOrigin(0.25, 0.25)
      .setAlpha(0)

    this.comboValue = this.add.bitmapText(Viewport.WIDTH / 2 - 10, VIEWPORT_PADDING + 100, 'matchup-64-white', 'x0')
      .setOrigin(0.25, 0.25)
      .setAlpha(0)
  }
  */

  private addComboMeter() {
    this.comboMeter = new ComboMeter(this, Viewport.WIDTH / 2, VIEWPORT_PADDING);
  }
}
