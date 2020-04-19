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
    // wallBottom visibility behavior
    if (!dungeon.hasNeighborTile(dungeonTile.gridX, dungeonTile.gridY, Direction.DOWN)) {
      dungeonTile.addEnterBehavior(() => {
        this.scene.tweens.killTweensOf(dungeon.getDungeonLayer('wallsDown'))
        this.scene.tweens.add({
          targets: dungeon.getDungeonLayer('wallsDown'),
          props: {
            alpha: 0.5
          },
          duration: 100
        });
      });
    } else {
      dungeonTile.addEnterBehavior(() => {
        this.scene.tweens.killTweensOf(dungeon.getDungeonLayer('wallsDown'))
        this.scene.tweens.add({
          targets: dungeon.getDungeonLayer('wallsDown'),
          props: {
            alpha: 1
          },
          duration: 100
        });
      });
    }
  }
}