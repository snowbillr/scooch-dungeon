export class HealthComponent {
  public maxHealth: number;
  public currentHealth: number;

  constructor(scene: Phaser.Scene, data: any) {
    this.maxHealth = data.maxHealth;
    this.currentHealth = data.maxHealth;
  }

  onAdd() {}

  destroy() {}

  subtract(value: number) {
    this.currentHealth -= value;
  }
}
