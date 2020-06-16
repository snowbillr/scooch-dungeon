import levels from '../../data/levels.json';

import { Level } from './level';

type Prerequisite = {
  type: string,
  name: string
}

export class LevelGroup {
  private levelIndices: number[];
  private prerequisites: Prerequisite[];

  constructor(
    public name: string,
  ) {
    const rawLevelGroup = levels.levelGroups.find(lg => lg.name === name);
    if (!rawLevelGroup) throw new Error(`Missing level group: ${name}`);

    this.levelIndices = rawLevelGroup.levels;
    this.prerequisites = rawLevelGroup.prerequisites;
  }

  getLevels() {
    return this.levelIndices.map(li => new Level(li));
  }

  getRelativeLevel(relativeIndex: number) {
    if (relativeIndex >= this.levelIndices.length) throw new Error('relative level index > group level count')

    return new Level(this.levelIndices[relativeIndex]);
  }

  getLevelCount() {
    return this.levelIndices.length;
  }

  getPrerequisiteLevelGroups() {
    return this.prerequisites.map(p => new LevelGroup(p.name));
  }
}
