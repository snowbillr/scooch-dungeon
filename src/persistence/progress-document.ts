import { PersistenceDocument } from "../plugins/global/persistence-plugin";

export class ProgressDocument implements PersistenceDocument {
  public readonly name = 'progress';

  public lastCompletedLevelNumber: number = 0;
  public coinsCollected: number = 0;

  public toJson() {
    return {
      levelNumber: this.lastCompletedLevelNumber,
      coinsCollected: this.coinsCollected
    };
  }

  public fromJson(data: Record<string, any>) {
    this.lastCompletedLevelNumber = data.levelNumber;
    this.coinsCollected = data.coinsCollected;
  }
}