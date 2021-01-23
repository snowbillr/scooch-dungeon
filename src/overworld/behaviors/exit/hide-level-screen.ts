import { GridTileBehavior } from '../../../grid-maps/grid-tile-behavior';
import { Direction } from '../../../constants/directions';
import { LevelGroup } from '../../../levels/level-group';
import { OverworldScene } from '../../../scenes/overworld-scene';

export class HideLevelScreenBehavior extends GridTileBehavior {
  public priority: number = 100;
  private levelGroup!: LevelGroup;

  public isApplicable(): boolean {
    return !!this.tile.getProperty('levelIndicator');
  }

  public run(scene: Phaser.Scene, direction: Direction): boolean {
    (scene as OverworldScene).hud.hideLevelScreen();

    return false;
  }

  public setLevelGroup(levelGroup: LevelGroup) {
    this.levelGroup = levelGroup;
  }
}
