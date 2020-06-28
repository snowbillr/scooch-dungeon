import { Direction } from "../../constants/directions";
import { DungeonBehavior } from '../dungeon-behavior';
import { GridTileBehaviorType } from '../../grid-maps/grid-tile';
import { DungeonScene } from '../../scenes/dungeon-scene';

export class CollectCoinBehavior extends DungeonBehavior {
  public priority: number = 100;

  public isApplicable(): boolean {
    return this.tile.hasObject('coin');
  }

  public run(scene: DungeonScene, direction: Direction): boolean {
    const coinSprite = this.tile.getObject('coin')?.sprite;

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

    this.tile.removeBehavior(GridTileBehaviorType.ENTER, this);

    return false;
  }
}
