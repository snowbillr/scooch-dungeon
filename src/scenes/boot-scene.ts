import { ScoochDungeonScene } from "./scooch-dungeon-scene";

import { ProgressDocument } from "../persistence/progress-document";
import { SettingsDocument } from '../persistence/settings-document';
import { SCENE_KEYS } from '../constants/scene-keys';

export class BootScene extends ScoochDungeonScene {
  constructor() {
    super({ key: SCENE_KEYS.BOOT });
  }

  create() {
    this.persistence.addDocument(new ProgressDocument());
    this.persistence.addDocument(new SettingsDocument());

    this.scene.start(SCENE_KEYS.PRELOAD);
  }
}
