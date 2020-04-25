import { PersistencePlugin } from "../plugins/persistence-plugin";

import { ProgressDocument } from "../persistence/progress-document";

export class BootScene extends Phaser.Scene {
  private persistence!: PersistencePlugin;

  constructor() {
    super({ key: 'boot' });
  }

  create() {
    this.persistence.addDocument(new ProgressDocument());

    this.scene.start('preload');
  }
}