import { ScoochDungeonScene } from "./scooch-dungeon-scene";

import { ProgressDocument } from "../persistence/progress-document";
import { SettingsDocument } from '../persistence/settings-document';

export class BootScene extends ScoochDungeonScene {
  constructor() {
    super({ key: 'boot' });
  }

  create() {
    this.persistence.addDocument(new ProgressDocument());
    this.persistence.addDocument(new SettingsDocument());

    this.scene.start('preload');
  }
}
