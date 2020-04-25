import { PersistenceDocument } from "../plugins/persistence-plugin";

export class ProgressDocument implements PersistenceDocument {
  public readonly name = 'progress';

  levelNumber: number = 0;

  public toJson() {
    return {
      levelNumber: this.levelNumber
    };
  }

  public fromJson(data: Record<string, any>) {
    this.levelNumber = data.levelNumber;
  }
}