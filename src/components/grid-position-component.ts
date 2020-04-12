export class GridPositionComponent {
  public gridX: number;
  public gridY: number;

  constructor(scene: Phaser.Scene, data: any) {
    this.gridX = data.gridX;
    this.gridY = data.gridY;
  }

  setGridPosition(gridX: number, gridY: number) {
    this.gridX = gridX;
    this.gridY = gridY;
  }

  destroy() {}
}