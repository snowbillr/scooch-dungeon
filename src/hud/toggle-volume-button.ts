import { Button, ButtonStyle } from './button';
import { ScoochDungeonScene } from '../scenes/scooch-dungeon-scene';
import { SettingsDocument } from '../persistence/settings-document';

export class ToggleVolumeButton {
  public gameObject: Phaser.GameObjects.Container;

  private scene: ScoochDungeonScene;
  private settings: SettingsDocument;
  private volumeIcon: Phaser.GameObjects.Image;

  constructor(scene: ScoochDungeonScene, x: number, y: number) {
    this.scene = scene;
    this.settings = scene.persistence.getDocument<SettingsDocument>('settings');
    this.volumeIcon = scene.add.image(0, 0, 'hud-volume')
    this.updateVolumeIcon();

    this.gameObject = new Button(scene, x, y, ButtonStyle.BACKGROUND_INVERSE, this.volumeIcon, () => this.toggleVolume());
  }

  private toggleVolume() {
    const newMuteValue = !this.scene.sound.mute;

    this.scene.sound.mute = newMuteValue;
    this.settings.setMuted(newMuteValue);

    this.updateVolumeIcon();

    this.scene.persistence.store();
  }

  private updateVolumeIcon() {
    this.volumeIcon.setFrame(this.settings.getMuted() ? 1 : 0)
  }
}
