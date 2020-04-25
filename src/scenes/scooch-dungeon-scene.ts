import { PersistencePlugin } from "../plugins/persistence-plugin";
import { PhecsPlugin } from "phecs";
import { LevelManagerPlugin } from "../plugins/level-manager-plugin";

export abstract class ScoochDungeonScene extends Phaser.Scene {
  protected persistence!: PersistencePlugin;
  protected phecs!: PhecsPlugin;
  protected levelManager!: LevelManagerPlugin;
}