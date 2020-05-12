import { DungeonTileBehavior, DungeonTile } from "../../dungeon/dungeon-tile";
import { Dungeon } from "../../dungeon/dungeon";
import { Direction } from "../../constants/directions";
import { ProgressDocument } from "../../persistence/progress-document";
import { DungeonScene } from "../../scenes/dungeon-scene";

export const WinBehavior: DungeonTileBehavior = {
  priority: 100,

  isApplicable(dungeonTile: DungeonTile, dungeon: Dungeon) {
    const cursor = dungeon.getCursor(dungeonTile.gridX, dungeonTile.gridY);

    return cursor.getCardinalNeighbors()
      .some(({ dungeonTile }) => dungeonTile.isObjective());
  },

  run(direction: Direction, dungeonTile: DungeonTile, scene: DungeonScene) {
    const cursor = scene.dungeon.getCursor(dungeonTile.gridX, dungeonTile.gridY);
    cursor.move(direction);
    if (!cursor.getTile().isObjective()) return false;

    dungeonTile.removeObject('swipe-indicator');
    const objectiveSprite = cursor.getTile().getObject('objective')?.sprite;

    const animPromise = new Promise(resolve => {
      objectiveSprite?.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, resolve);
    });

    scene.sfx.pauseLevelMusic();
    objectiveSprite?.anims.play('objective-win');

    Promise.all([animPromise, scene.sfx.playWinSfx()]).then(() => {
      if (scene.levelManager.hasNextLevel()) {
        scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
          const progressDocument = scene.persistence.getDocument<ProgressDocument>('progress');
          progressDocument.completeLevel(scene.levelManager.getCurrentLevelNumber(), scene.dungeon.stats);
          scene.persistence.store();

          scene.levelManager.setCurrentLevelNumber(scene.levelManager.getCurrentLevelNumber() + 1);

          scene.scene.restart();
        });
        scene.cameras.main.fadeOut(700);
      } else {
        console.log('beat all the levels')
      }
    });

    return true;
  }
};
