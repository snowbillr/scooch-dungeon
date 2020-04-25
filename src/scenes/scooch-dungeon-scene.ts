import { PersistencePlugin } from "../plugins/global/persistence-plugin";
import { PhecsPlugin } from "phecs";
import { LevelManagerPlugin } from "../plugins/global/level-manager-plugin";
import { SwipePlugin } from "../plugins/scene/swipe-plugin";

export abstract class ScoochDungeonScene extends Phaser.Scene {
  protected persistence!: PersistencePlugin;
  protected phecs!: PhecsPlugin;
  protected levelManager!: LevelManagerPlugin;
  protected swipe!: SwipePlugin;
}