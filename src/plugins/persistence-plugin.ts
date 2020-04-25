const STORAGE_KEY = 'scooch-dungeon';

export interface PersistenceDocument {
  name: string;
  toJson: () => object;
  fromJson: (data: Record<string, any>) => void;
}

export class PersistencePlugin extends Phaser.Plugins.BasePlugin {
  private documents: PersistenceDocument[];

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);

    this.documents = [];
  }

  addDocument(document: PersistenceDocument) {
    this.documents.push(document);
  }

  getDocument<T extends PersistenceDocument>(name: string): T {
    const document = this.documents.find(doc => doc.name === name);

    if (!document) throw new Error(`No persistence document found: ${name}`);

    return document as T;
  }

  store() {
    const jsonData: Record<string, object> = this.documents.reduce((acc, document) => {
      acc[document.name] = document.toJson();

      return acc;
    }, {} as Record<string, object>);

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(jsonData));
  }

  read() {
    const rawData = window.localStorage.getItem(STORAGE_KEY) || '{}';
    const jsonData = JSON.parse(rawData) as Record<string, object>;

    Object.entries(jsonData).forEach(([name, data]) => {
      const document = this.documents.find(doc => doc.name === name);
      document?.fromJson(data);
    });
  }
}