import levels from '../../data/levels.json';

type LevelLoadDatum = {
  levelKey: string,
  levelFilePath: string
}

export class LevelLoader {
  constructor(private loader: Phaser.Loader.LoaderPlugin) {}

  load() {
    const levelLoadData = this.getLevelLoadData();
    levelLoadData.forEach(datum => {
      this.loader.tilemapTiledJSON(datum.levelKey, datum.levelFilePath);
    });
  }

  private getLevelLoadData(): LevelLoadDatum[] {
    const levelIndices = this.getLevelIndices();
    const levelLoadData = levelIndices.map(levelIndex => {
      const levelKey = `level-${String(levelIndex).padStart(3, '0')}`;
      const levelFilePath = `assets/levels/${String(levelIndex).padStart(3, '0')}.json`;

      return {
        levelKey,
        levelFilePath
      };
    });

    return levelLoadData;
  }

  private getLevelIndices(): number[] {
    const levelIndexSet: Set<number> = new Set();
    levels.levelGroups.forEach(levelGroup => {
      levelGroup.levels.forEach(levelIndex => {
        levelIndexSet.add(levelIndex);
      });
    });

    return Array.from(levelIndexSet);
  }
}
