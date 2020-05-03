import { PersistenceDocument } from "../plugins/global/persistence-plugin";

export class ProgressDocument implements PersistenceDocument {
  public readonly name = 'progress';

  public lastCompletedLevelNumber: number = 0;

  public toJson() {
    return {
      levelNumber: this.lastCompletedLevelNumber
    };
  }

  public fromJson(data: Record<string, any>) {
    this.lastCompletedLevelNumber = data.levelNumber;
  }
}