import { DungeonTileBehaviorType } from "../../dungeon/dungeon-tile";
import { Direction } from "../../constants/directions";
import { DungeonBehavior } from '../dungeon-behavior';

export class CollectCoinBehavior extends DungeonBehavior {
  public priority: number = 100;

  public isApplicable(): boolean {
    return this.tile.hasObject('coin');
  }

  public run(direction: Direction): boolean {
    const coinSprite = this.tile.getObject('coin')?.sprite;

    this.scene.sfx.playCoinSfx();

    this.scene.dungeon.stats.incrementCoins();
    this.scene.hud.setCollectedCoins(this.scene.dungeon.stats.getCoins());

    this.scene.tweens.add({
      targets: coinSprite,
      props: {
        y: '-=50',
        alpha: 0,
      },
      duration: 200
    });

    this.tile.removeBehavior(DungeonTileBehaviorType.ENTER, this);

    return false;
  }
}
