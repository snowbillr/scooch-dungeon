import { GridObject } from '../../grid-maps/grid-object';
import { GridTile, GridTileBehaviorType } from '../../grid-maps/grid-tile';
import { ScoochDungeonScene } from '../../scenes/scooch-dungeon-scene';
import { ShowLevelScreenBehavior } from '../behaviors/enter/show-level-screen';
import { HideLevelScreenBehavior } from '../behaviors/exit/hide-level-screen';
import { LevelGroup } from '../../levels/level-group';
import { LevelSelectBox } from '../level-select-box';

export class LevelIndicator extends GridObject {
  private showLevelScreenBehavior: ShowLevelScreenBehavior;
  private hideLevelScreenBehavior: HideLevelScreenBehavior;

  private levelSelectBox: LevelSelectBox;

  constructor(
    scene: Phaser.Scene,
    dungeonTile: GridTile,
    name: string,
    sprite: Phaser.GameObjects.Sprite,
    extraProperties: Record<string, any>
  ) {
    super(scene, dungeonTile, name, sprite, extraProperties);

    this.sprite.x += 16;
    this.sprite.y += 16;
    this.sprite.setOrigin(0.5)

    this.showLevelScreenBehavior = new ShowLevelScreenBehavior(dungeonTile);
    this.showLevelScreenBehavior.setLevelGroup(new LevelGroup(extraProperties.levelGroup))
    this.hideLevelScreenBehavior = new HideLevelScreenBehavior(dungeonTile);
    this.hideLevelScreenBehavior.setLevelGroup(new LevelGroup(extraProperties.levelGroup))

    this.dungeonTile.addBehavior(GridTileBehaviorType.ENTER, this.showLevelScreenBehavior);
    this.dungeonTile.addBehavior(GridTileBehaviorType.EXIT, this.hideLevelScreenBehavior);
  }

  showLevelSelect() {

  }

  hideLevelSelect() {

  }
}
