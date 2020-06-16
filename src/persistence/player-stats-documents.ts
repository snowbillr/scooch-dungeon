import { PersistenceDocument } from "../plugins/global/persistence-plugin";

export class PlayerStatsDocument implements PersistenceDocument {
  public readonly name = 'player-stats';

  private maxHealth: number = 2;

  public toJson() {
    return {
      maxHealth: this.maxHealth
    };
  }

  public fromJson(data: Record<string, any>) {
    this.maxHealth = data.maxHealth ?? 2;
  }

  public getMaxHealth() {
    return this.maxHealth;
  }

  public setMaxHealth(value: number) {
    this.maxHealth = value;
  }
}
