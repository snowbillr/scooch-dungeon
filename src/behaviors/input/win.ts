import { DungeonTileBehavior, DungeonTile } from "../../dungeon/dungeon-tile";
import { Dungeon } from "../../dungeon/dungeon";
import { Direction } from "../../constants/directions";
import { ProgressDocument } from "../../persistence/progress-document";
import { DungeonScene } from "../../scenes/dungeon-scene";

export const WinBehavior: DungeonTileBehavior = {
  isApplicable(dungeonTile: DungeonTile, dungeon: Dungeon) {
    const cursor = dungeon.getCursor(dungeonTile.gridX, dungeonTile.gridY);

    let isApplicable = false;

    if (cursor.right()) {
      isApplicable = isApplicable || cursor.getTile().isObjective();
    }

    cursor.reset();
    if (cursor.left()) {
      isApplicable = isApplicable || cursor.getTile().isObjective();
    }

    cursor.reset();
    if (cursor.up()) {
      isApplicable = isApplicable || cursor.getTile().isObjective();
    }

    cursor.reset();
    if (cursor.down()) {
      isApplicable = isApplicable || cursor.getTile().isObjective();
    }

    return isApplicable;
  },

  run(direction: Direction, dungeonTile: DungeonTile, scene: DungeonScene) {
    const cursor = scene.dungeon.getCursor(dungeonTile.gridX, dungeonTile.gridY);
    cursor.move(direction);
    if (!cursor.getTile().isObjective()) return;

    cursor.getTile().getObject('objective')?.sprite.on(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
      if (scene.levelManager.hasNextLevel()) {
        scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
          const progressDocument = scene.persistence.getDocument<ProgressDocument>('progress');
          progressDocument.lastCompletedLevelNumber = scene.levelManager.getCurrentLevelNumber();
          scene.persistence.store();
          scene.levelManager.setCurrentLevelNumber(scene.levelManager.getCurrentLevelNumber() + 1);

          scene.scene.restart();
        });
        scene.cameras.main.fadeOut(700);
      } else {
        console.log('beat all the levels')
      }
      });

    cursor.getTile().getObject('objective')?.sprite.anims.play('objective-win');
  }
};
