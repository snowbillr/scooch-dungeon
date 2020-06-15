export class Level {
  constructor(private index: number) {

  }

  getKey() {
    return `level-${String(this.index).padStart(3, '0')}`;
  }

  getIndex() {
    return this.index;
  }
}
