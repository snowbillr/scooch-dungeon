export const LEVELS_COUNT = 3;

const levels = Array.from({ length: LEVELS_COUNT }, (v, i) => i + 1).reduce((acc, i) => {
  const levelKey = String(i).padStart(3, '0');
  acc[i] = `level-${levelKey}`;
  return acc;
}, {} as Record<number, string>);

export class LevelManagerPlugin extends Phaser.Plugins.BasePlugin {
  private levelNumber: number;

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);

    this.levelNumber = 0;
  }

  setLevelNumber(levelNumber: number) {
    this.levelNumber = levelNumber;
  }

  getLevelNumber() {
    return this.levelNumber;
  }

  hasNextLevel() {
    return this.hasLevel(this.levelNumber + 1);
  }

  hasLevel(levelNumberToCheck?: number) {
    return Boolean(levels[levelNumberToCheck ?? this.levelNumber]);
  }

  getLevelKey() {
    return levels[this.levelNumber];
  }
}
