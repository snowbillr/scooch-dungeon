import { Direction } from "../../../constants/directions";
import { ProgressDocument } from "../../../persistence/progress-document";
import { StateMachineComponent } from '../../../components/state-machine-component';
import { SCENE_KEYS } from '../../../constants/scene-keys';
import { DungeonScene } from '../../../scenes/dungeon-scene';
import { GridTileBehavior } from '../../../grid-maps/grid-tile-behavior';

export class WinBehavior extends GridTileBehavior {
  public priority: number = 100;

  public isApplicable(): boolean {
    const cursor = this.tile.gridMap.getCursor(this.tile.gridX, this.tile.gridY);

    return cursor.getCardinalNeighbors()
      .some(({ gridTile }) => gridTile.getProperty('objective'));
  }

  public run(scene: DungeonScene, direction: Direction): boolean {
    scene.hero.getComponent(StateMachineComponent).stateMachine.stop();

    const cursor = this.tile.gridMap.getCursor(this.tile.gridX, this.tile.gridY);
    cursor.move(direction);
    if (!cursor.getTile().getProperty('objective')) return false;

    this.tile.removeObject('swipe-indicator');
    const objectiveSprite = cursor.getTile().getObject('objective')?.sprite;

    const animPromise = new Promise(resolve => {
      objectiveSprite?.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, resolve);
    });

    scene.scene.stop(SCENE_KEYS.HUD);
    scene.sfx.pauseLevelMusic();
    objectiveSprite?.anims.play('objective-win');


    Promise.all([animPromise, scene.sfx.playWinSfx()]).then(() => {
      scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        const progressDocument = scene.persistence.getDocument<ProgressDocument>('progress');

        progressDocument.completeLevel(
          scene.levelSession.getCurrentLevel().getIndex(),
          scene.dungeon.stats
        );
        scene.persistence.store();

        if (scene.levelSession.didCompleteLevelGroup()) {
          scene.scene.start(SCENE_KEYS.OVERWORLD);
        } else {
          scene.levelSession.incrementCurrentLevelRelativeIndex();
          scene.scene.restart();
        }
      });

      scene.cameras.main.fadeOut(700);
    });

    return true;
  }
}
