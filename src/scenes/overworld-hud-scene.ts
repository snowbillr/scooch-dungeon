import { SCENE_KEYS } from "../constants/scene-keys";
import { ScoochDungeonScene } from "./scooch-dungeon-scene";
import { LevelGroup } from "../levels/level-group";
import { NinePatch } from "@koreez/phaser3-ninepatch";
import { Button, ButtonStyle } from "../hud/button";

const VIEWPORT_PADDING = 60;

export class OverworldHUDScene extends ScoochDungeonScene {
  private pauseMenu: NinePatch | null = null;

  constructor() {
    super({ key: SCENE_KEYS.OVERWORLD_HUD });
  }

  create() {}

  showLevelScreen(levelGroup: LevelGroup) {
    const menuX = this.scale.width / 2;
    const menuY = this.scale.height - 100;
    const menuWidth = 250;
    const menuHeight = 150;

    this.pauseMenu = (this.add as any).ninePatch(menuX, this.scale.height + 100, menuWidth, menuHeight, 'menubox', null, {
      top: 16,
      bottom: 16,
      left: 16,
      right: 16
    }) as NinePatch;
    this.pauseMenu.setScrollFactor(0);

    this.pauseMenu.add([
      this.add.bitmapText(0, -40, 'matchup-32', levelGroup.name).setOrigin(0.5),
      (new Button(this, 0, 20, ButtonStyle.BACKGROUND_INVERSE,
        this.add.bitmapText(0, -2, 'matchup-32', 'Play').setOrigin(0.5), () => {
          this.levelSession.begin({
            levelGroup,
            currentLevelRelativeIndex: 0,
            maxHealth: 2
          });
          this.scene.stop(SCENE_KEYS.OVERWORLD);
          this.scene.stop(SCENE_KEYS.OVERWORLD_HUD);
          this.scene.start(SCENE_KEYS.DUNGEON);
        })).gameObject
    ]);

    this.tweens.add({
      targets: this.pauseMenu,
      props: {
        y: menuY
      },
      duration: 400,
      ease: Phaser.Math.Easing.Quadratic.InOut
    });
  }

  hideLevelScreen() {
    this.tweens.add({
      targets: this.pauseMenu,
      props: {
        y: this.scale.height + 100
      },
      duration: 400,
      ease: Phaser.Math.Easing.Quadratic.InOut,
      onComplete: () => {
        this.pauseMenu?.destroy()!
      }
    });
  }
}