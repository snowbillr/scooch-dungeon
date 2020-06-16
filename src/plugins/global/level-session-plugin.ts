import { LevelGroup } from '../../levels/level-group';

type LevelSessionConfig = {
  levelGroup: LevelGroup;
  currentLevelRelativeIndex: number;

  maxHealth: number;
};

export class LevelSessionPlugin extends Phaser.Plugins.BasePlugin {
  private levelGroup!: LevelGroup;
  private currentLevelRelativeIndex: number = 0;

  private maxHealth: number = 0;
  private health: number = 0;

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);
  }

  begin(config: LevelSessionConfig) {
    this.levelGroup = config.levelGroup;
    this.currentLevelRelativeIndex = config.currentLevelRelativeIndex;

    this.maxHealth = config.maxHealth;
    this.health = config.maxHealth;
  }

  restart() {
    this.health = this.maxHealth;
  }

  getLevelGroup() {
    return this.levelGroup;
  }

  incrementCurrentLevelRelativeIndex() {
    this.currentLevelRelativeIndex = this.currentLevelRelativeIndex + 1;
  }

  didCompleteLevelGroup() {
    return this.currentLevelRelativeIndex + 1 >= this.levelGroup.getLevelCount();
  }

  getCurrentLevel() {
    return this.levelGroup.getRelativeLevel(this.currentLevelRelativeIndex);
  }

  subtractHealth(amount: number) {
    this.health -= amount;
  }

  setHealth(value: number) {
    this.health = value;
  }

  getHealth() {
    return this.health;
  }

  getMaxHealth() {
    return this.maxHealth;
  }
}

export const LevelSessionPluginConfig = {
  key: 'LevelSessionPlugin',
  plugin: LevelSessionPlugin,
  mapping: 'levelSession',
  start: true
};
