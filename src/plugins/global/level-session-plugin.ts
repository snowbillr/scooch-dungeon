type LevelSessionConfig = {
  maxHealth: number;
};

export class LevelSessionPlugin extends Phaser.Plugins.BasePlugin {
  private maxHealth: number = 0;
  private health: number = 0;

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);
  }

  begin(config: LevelSessionConfig) {
    this.maxHealth = config.maxHealth;
    this.health = config.maxHealth;
  }

  restart() {
    this.health = this.maxHealth;
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
