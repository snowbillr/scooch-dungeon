export class DungeonStats {
  private coins: number;

  constructor() {
    this.coins = 0;
  }

  incrementCoins() {
    this.coins += 1;
  }

  getCoins() {
    return this.coins;
  }
}