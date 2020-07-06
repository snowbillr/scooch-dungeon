import { GridTileBehavior } from '../../../grid-maps/grid-tile-behavior';
import { Direction } from '../../../constants/directions';
import { LevelGroup } from '../../../levels/level-group';

export class ShowLevelScreenBehavior extends GridTileBehavior {
  public priority: number = 100;
  private levelGroup!: LevelGroup;

  public isApplicable(): boolean {
    return !!this.tile.getProperty('levelIndicator');
  }

  public run(scene: Phaser.Scene, direction: Direction): boolean {
    console.log('show level screen')
    console.log(this.levelGroup)

    return false;
  }

  public setLevelGroup(levelGroup: LevelGroup) {
    this.levelGroup = levelGroup;
  }
}
