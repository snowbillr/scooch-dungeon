import { PersistenceDocument } from "../plugins/global/persistence-plugin";

export class SettingsDocument implements PersistenceDocument {
  public readonly name = 'settings';

  private muted: boolean = false;

  public toJson() {
    return {
      muted: this.muted
    };
  }

  public fromJson(data: Record<string, any>) {
    this.muted = data.muted ?? false;
  }

  public getMuted() {
    return this.muted;
  }

  public setMuted(value: boolean) {
    this.muted = value;
  }
}
