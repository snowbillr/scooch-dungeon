export const LEVELS_COUNT = 5;

/*
const levels = Array.from({ length: LEVELS_COUNT }, (v, i) => i).reduce((acc, i) => {
  const levelKey = String(i).padStart(3, '0');
  acc[i] = `level-${levelKey}`;
  return acc;
}, {} as Record<number, string>);
*/

export class LevelManagerPlugin extends Phaser.Plugins.BasePlugin {
  private currentLevelNumber: number;

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);

    this.currentLevelNumber = 0;
  }

  setCurrentLevelNumber(levelNumber: number) {
    this.currentLevelNumber = levelNumber;
  }

  getCurrentLevelNumber() {
    return this.currentLevelNumber;
  }

  hasNextLevel() {
    return this.hasLevel(this.currentLevelNumber);
  }

  hasLevel(levelNumberToCheck?: number) {
    // return Boolean(levels[levelNumberToCheck ?? this.currentLevelNumber]);
    return (levelNumberToCheck ?? this.currentLevelNumber) <= LEVELS_COUNT;
  }

  getCurrentLevelKey() {
    // return levels[this.currentLevelNumber];
    return this.keyForLevelNumber(this.currentLevelNumber);
  }

  fileForLevelNumber(levelNumber: number) {
    return String(levelNumber).padStart(3, '0');
  }

  keyForLevelNumber(levelNumber: number) {
    return `level-${String(levelNumber).padStart(3, '0')}`;
  }
}
