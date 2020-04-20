import { DungeonTileProperties, DungeonTile, DungeonTileBehavior } from "./dungeon-tile";
import { Dungeon } from "./dungeon";
import { Direction } from "../constants/directions";

export class DungeonTileFactory {
  constructor(
    private readonly scene: Phaser.Scene
  ) {}

  create(
    gridX: number,
    gridY: number,
    worldX: number,
    worldY: number,
    properties: DungeonTileProperties,
  ): DungeonTile {
    const computedProperties: DungeonTileProperties = {}

    computedProperties.walkable = !!properties.walkable;

    return new DungeonTile(gridX, gridY, worldX, worldY, computedProperties);
  }

  process(dungeonTile: DungeonTile, dungeon: Dungeon) {
    const bottomRowCursor = dungeon.getCursor(dungeonTile.gridY, dungeonTile.gridY);
    bottomRowCursor.down();

    // wallBottom visibility behavior
    if (!bottomRowCursor.exists()) {
      dungeonTile.addEnterBehavior(() => {
        const wallsDownLayer = dungeon.getDungeonLayer('wallsDown');
        if (Phaser.Math.Within(wallsDownLayer.alpha, 1, 0.01)) {
          this.scene.tweens.killTweensOf(wallsDownLayer)
          this.scene.tweens.add({
            targets: dungeon.getDungeonLayer('wallsDown'),
            props: {
              alpha: 0.5
            },
            duration: 100
          });
        }
      });
    }

    const secondToBottomRowCursor = dungeon.getCursor(dungeonTile.gridY, dungeonTile.gridY);
    secondToBottomRowCursor.down();
    secondToBottomRowCursor.down();
    if (!secondToBottomRowCursor.exists() && bottomRowCursor.exists()) {
      dungeonTile.addEnterBehavior(() => {
        const wallsDownLayer = dungeon.getDungeonLayer('wallsDown');
        if (Phaser.Math.Within(wallsDownLayer.alpha, 0.5, 0.01)) {
          this.scene.tweens.killTweensOf(wallsDownLayer)
          this.scene.tweens.add({
            targets: dungeon.getDungeonLayer('wallsDown'),
            props: {
              alpha: 1
            },
            duration: 100
          });
        }
      });
    }
  }
}