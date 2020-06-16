import { PersistencePlugin } from "../plugins/global/persistence-plugin";
import { PhecsPlugin } from "phecs";
import { SwipePlugin } from "../plugins/scene/swipe-plugin";
import { SfxScene } from "./sfx-scene";
import { SCENE_KEYS } from '../constants/scene-keys';
import { LevelSessionPlugin } from '../plugins/global/level-session-plugin';

export abstract class ScoochDungeonScene extends Phaser.Scene {
  public persistence!: PersistencePlugin;
  public phecs!: PhecsPlugin;
  public swipe!: SwipePlugin;
  public levelSession!: LevelSessionPlugin;

  public get sfx(): SfxScene {
    return this.scene.get(SCENE_KEYS.SFX) as SfxScene;
  }
}
