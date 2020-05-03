import { PersistenceDocument } from "../plugins/global/persistence-plugin";
import { DungeonStats } from "../dungeon/dungeon-stats";

type LevelAttempt = {
  coins: number;
  // moves: number;
};

type LevelRecord = {
  levelNumber: number;
  attempts: LevelAttempt[];
}

export class ProgressDocument implements PersistenceDocument {
  public readonly name = 'progress';

  public lastCompletedLevelNumber: number = 0;
  public levelRecords: Record<number, LevelRecord> = {};

  public toJson() {
    return {
      lastCompletedLevelNumber: this.lastCompletedLevelNumber,
      levelRecords: this.levelRecords
    };
  }

  public fromJson(data: Record<string, any>) {
    this.lastCompletedLevelNumber = data.lastCompletedLevelNumber;
    this.levelRecords = data.levelRecords;
  }

  public completeLevel(levelNumber: number, stats: DungeonStats) {
    const levelRecord = this.levelRecords[levelNumber] ?? { levelNumber, attempts: [] };
    levelRecord.attempts.push({
      coins: stats.getCoins()
    });

    this.levelRecords[levelNumber] = levelRecord;
  }
}