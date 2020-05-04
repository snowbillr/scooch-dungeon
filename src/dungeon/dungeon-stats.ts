export class DungeonStats {
  private coins: number;
  private moves: number;

  constructor() {
    this.coins = 0;
    this.moves = 0;
  }

  reset() {
    this.coins = 0;
    this.moves = 0;
  }

  incrementCoins() {
    this.coins += 1;
  }

  getCoins() {
    return this.coins;
  }

  incrementMoves() {
    this.moves += 1;
  }

  getMoves() {
    return this.moves;
  }
}