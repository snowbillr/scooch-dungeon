const levels = Array.from({ length: 3 }, (v, i) => i + 1).reduce((acc, i) => {
  const levelKey = String(i).padStart(3, '0');
  acc[i] = `level-${levelKey}`;
  return acc;
}, {} as Record<number, string>);

console.log(levels);

export class LevelManagerPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);
  }

  hasLevel(levelNumber: number) {
    return Boolean(levels[levelNumber]);
  }

  getLevelKey(levelNumber: number) {
    return levels[levelNumber];
  }
}
