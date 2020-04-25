export class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'title' });
  }

  create() {
    this.cameras.main.setBackgroundColor(0x25131a);

    this.add.image(this.cameras.main.centerX, 100, 'logo')
      .setScale(0.6);

    const playText = this.add.bitmapText(this.cameras.main.centerX, 300, 'matchup-32', 'PLAY').setOrigin(0.5);
    playText.setInteractive();
    playText.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.scene.start('dungeon', { levelNumber: 1 });
    })
  }
}