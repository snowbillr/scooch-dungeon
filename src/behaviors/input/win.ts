import { Direction } from "../../constants/directions";
import { ProgressDocument } from "../../persistence/progress-document";
import { StateMachineComponent } from '../../components/state-machine-component';
import { SCENE_KEYS } from '../../constants/scene-keys';
import { DungeonBehavior } from '../dungeon-behavior';

export class WinBehavior extends DungeonBehavior {
  public priority: number = 100;

  public isApplicable(): boolean {
    const cursor = this.dungeon.getCursor(this.tile.gridX, this.tile.gridY);

    return cursor.getCardinalNeighbors()
      .some(({ dungeonTile }) => dungeonTile.isObjective());
  }

  public run(direction: Direction): boolean {
    this.scene.hero.getComponent(StateMachineComponent).stateMachine.stop();

    const cursor = this.scene.dungeon.getCursor(this.tile.gridX, this.tile.gridY);
    cursor.move(direction);
    if (!cursor.getTile().isObjective()) return false;

    this.tile.removeObject('swipe-indicator');
    const objectiveSprite = cursor.getTile().getObject('objective')?.sprite;

    const animPromise = new Promise(resolve => {
      objectiveSprite?.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, resolve);
    });

    this.scene.scene.stop(SCENE_KEYS.HUD);
    this.scene.sfx.pauseLevelMusic();
    objectiveSprite?.anims.play('objective-win');


    Promise.all([animPromise, this.scene.sfx.playWinSfx()]).then(() => {
      this.scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        const progressDocument = this.scene.persistence.getDocument<ProgressDocument>('progress');

        progressDocument.completeLevel(
          this.scene.levelSession.getCurrentLevel().getIndex(),
          this.scene.dungeon.stats
        );
        this.scene.persistence.store();

        if (this.scene.levelSession.didCompleteLevelGroup()) {
          this.scene.scene.start(SCENE_KEYS.LEVEL_SELECT);
        } else {
          this.scene.levelSession.incrementCurrentLevelRelativeIndex();
          this.scene.scene.restart();
        }
      });

      this.scene.cameras.main.fadeOut(700);
    });

    return true;
  }
}
