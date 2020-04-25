import { ProgressDocument } from "../persistence/progress-document";
import { ScoochDungeonScene } from "./scooch-dungeon-scene";

export class BootScene extends ScoochDungeonScene {
  constructor() {
    super({ key: 'boot' });
  }

  create() {
    this.persistence.addDocument(new ProgressDocument());

    this.scene.start('preload');
  }
}