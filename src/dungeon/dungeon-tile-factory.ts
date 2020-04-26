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
    properties: Record<string, any[]>,
  ): DungeonTile {
    const computedProperties: DungeonTileProperties = {
      walkable: properties.walkable.reduce((acc, w) => acc && w, true),
      objective: properties.objective.reduce((acc, o) => acc || o, false)
    };

    return new DungeonTile(gridX, gridY, worldX, worldY, computedProperties, properties.objects);
  }

  process(dungeonTile: DungeonTile, dungeon: Dungeon) {
    /*
    const cursor = dungeon.getCursor(dungeonTile.gridY, dungeonTile.gridY);

    if (!dungeon.getCursor(dungeonTile.gridX, dungeonTile.gridY).down()) {
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

    cursor.set(dungeonTile.gridX, dungeonTile.gridY);
    if (cursor.down() && !cursor.down()) {
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
    */
  }
}