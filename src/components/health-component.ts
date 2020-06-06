import { ScoochDungeonScene } from '../scenes/scooch-dungeon-scene';

export class HealthComponent {
  public readonly maxHealth: number;
  public readonly currentHealth: number;

  constructor(scene: Phaser.Scene, data: any) {
    this.maxHealth = data.maxHealth;
    this.currentHealth = data.maxHealth;
  }

  onAdd() {}

  destroy() {}
}
