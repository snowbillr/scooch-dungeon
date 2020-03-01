import Phaser from 'phaser';
import { PhecsPlugin } from 'phecs';

class PointComponent {
  private x: number;
  private y: number;

  constructor(scene: Phaser.Scene, data: any) {
    this.x = data.x;
    this.y = data.y;
  }
}

class PointDisplaySystem {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  start(phEntities) {
    const pointEntities = phEntities.getEntities(PointComponent);
    
    const graphics = this.scene.add.graphics();

    graphics.fillStyle(0xFF0000, 1);

    pointEntities.forEach(pointEntity => {
      const pointComponent = pointEntity.getComponent(PointComponent);
      graphics.fillCircle(pointComponent.x, pointComponent.y, 10);
    });
  }

  /*
  stop() {

  }

  update() {

  }

  destroy() {

  }
  */
}

class GameScene extends Phaser.Scene {
  phecs: PhecsPlugin;

  init() {
    this.phecs.register.system(PointDisplaySystem);

    this.phecs.register.prefab('point', {
      components: [
        {
          component: PointComponent,
        }
      ]
    });
  }

  create() {
    this.phecs.add.prefab('point', {}, 10, 20);
    this.phecs.add.prefab('point', {}, 100, 20);
    this.phecs.add.prefab('point', {}, 50, 100);

    this.phecs.add.entity([PointComponent], 100, 100);
  }
}

const game = new Phaser.Game({
  width: 500,
  height: 500,
  scene: [GameScene],
  plugins: {
    scene: [
      {
        key: 'Phecs',
        plugin: PhecsPlugin,
        mapping: 'phecs',
      }
    ]
  }
});