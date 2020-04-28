import { Entity } from "phecs/dist/entity";
import { Direction } from "../constants/directions";
import { Dungeon } from "../dungeon/dungeon";
import { DungeonTile } from "../dungeon/dungeon-tile";
import { ScoochDungeonScene } from "../scenes/scooch-dungeon-scene";

export abstract class BaseBehavior {
  constructor(
    protected scene: Phaser.Scene
  ) {}

  abstract isApplicable(dungeon: Dungeon, dungeonTile: DungeonTile): boolean;
  abstract run(hero: Entity, direction: Direction, dungeon: Dungeon, scene: ScoochDungeonScene): void;
}