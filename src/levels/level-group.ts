import levels from '../../data/levels.json';

import { Level } from './level';

export class LevelGroup {
  private levelIndices: number[];

  constructor(
    public name: string,
  ) {
    const rawLevelGroup = levels.levelGroups.find(lg => lg.name === name);
    if (!rawLevelGroup) throw new Error(`Missing level group: ${name}`);

    this.levelIndices = rawLevelGroup.levels;
  }

  getLevels() {
    return this.levelIndices.map(li => new Level(li));
  }

  getRelativeLevel(relativeIndex: number) {
    return new Level(this.levelIndices[relativeIndex]);
  }

  getLevelCount() {
    return this.levelIndices.length;
  }
}
