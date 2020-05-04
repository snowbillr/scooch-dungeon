import { DungeonTileBehavior, DungeonTile } from "../../dungeon/dungeon-tile";
import { Direction } from "../../constants/directions";
import { Dungeon } from "../../dungeon/dungeon";
import { DungeonScene } from "../../scenes/dungeon-scene";

export const CollectCoinBehavior: DungeonTileBehavior = {
  priority: 100,
  stopPropagation: false,

  isApplicable(dungeonTile: DungeonTile, dungeon: Dungeon) {
    return Boolean(dungeonTile.getObject('coin'));
  },

  run(direction: Direction, dungeonTile: DungeonTile, scene: DungeonScene) {
    console.log('run collect coin behavior')
    const coinSprite = dungeonTile.getObject('coin')?.sprite;

    scene.sfx.playCoinSfx();

    scene.dungeon.stats.incrementCoins();
    scene.hud.setCollectedCoins(scene.dungeon.stats.getCoins());

    scene.tweens.add({
      targets: coinSprite,
      props: {
        y: '-=50',
        alpha: 0,
      },
      duration: 200
    });

    dungeonTile.removeEnterBehavior(this);
  }
}