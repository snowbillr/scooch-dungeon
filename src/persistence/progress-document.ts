import { PersistenceDocument } from "../plugins/global/persistence-plugin";
import { DungeonStats } from "../dungeon/dungeon-stats";
import { LevelGroup } from '../levels/level-group';

type LevelAttempt = {
  coins: number;
  moves: number;
};

type LevelRecord = {
  levelNumber: number;
  attempts: LevelAttempt[];
}

export class ProgressDocument implements PersistenceDocument {
  public readonly name = 'progress';

  public levelRecords: Record<number, LevelRecord> = {};

  public toJson() {
    return {
      levelRecords: this.levelRecords
    };
  }

  public fromJson(data: Record<string, any>) {
    this.levelRecords = data.levelRecords;
  }

  public completeLevel(levelNumber: number, stats: DungeonStats) {
    const levelRecord = this.levelRecords[levelNumber] ?? { levelNumber, attempts: [] };
    levelRecord.attempts.push({
      coins: stats.getCoins(),
      moves: stats.getMoves()
    });

    this.levelRecords[levelNumber] = levelRecord;
  }

  public getLastCompletedLevelNumber() {
    const sortedLevelNumbers = Object.keys(this.levelRecords).map(Number).sort();
    return sortedLevelNumbers[sortedLevelNumbers.length - 1] ?? -1;
  }

  public isLevelCompleted(levelNumber: number) {
    return this.levelRecords[levelNumber];
  }

  public getLevelGroupUnlocked(levelGroupName: string) {
    const levelGroup = new LevelGroup(levelGroupName);
    const prerequisiteLevelGroups = levelGroup.getPrerequisiteLevelGroups();

    return prerequisiteLevelGroups.every(lg => {
      const levels = lg.getLevels();
      return levels.every(l => this.isLevelCompleted(l.getIndex()));
    });
  }
}
