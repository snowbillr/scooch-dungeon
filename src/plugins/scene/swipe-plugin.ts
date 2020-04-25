import { Direction } from "../../constants/directions";

const DISTANCE_THRESHOLD = 100;

export type SwipeListener = (direction: Direction) => void;

export class SwipePlugin extends Phaser.Plugins.ScenePlugin  {
  private listeners: SwipeListener[];
  private hasSwiped: boolean;

  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
    super(scene, pluginManager);

    this.listeners = [];
    this.hasSwiped = false;

    scene.events.once(Phaser.Scenes.Events.START, this.startListening, this);
    scene.events.once(Phaser.Scenes.Events.SHUTDOWN, this.stopListening, this);
  }

  addListener(listener: SwipeListener) {
    this.listeners.push(listener);
  }

  private startListening() {
    this.scene.input.on(Phaser.Input.Events.POINTER_DOWN, this.onPointerDown, this);
    this.scene.input.on(Phaser.Input.Events.POINTER_UP, this.onPointerUp, this);
    this.scene.input.on(Phaser.Input.Events.POINTER_MOVE, this.onPointerMove, this);
  }

  private stopListening() {
    this.listeners = [];
    this.scene.input.off(Phaser.Input.Events.POINTER_DOWN, this.onPointerDown, this);
    this.scene.input.off(Phaser.Input.Events.POINTER_UP, this.onPointerUp, this);
    this.scene.input.off(Phaser.Input.Events.POINTER_MOVE, this.onPointerMove, this);
  }

  onPointerDown() {
    this.hasSwiped = false;
  }

  onPointerUp() {
    this.hasSwiped = true;
  }

  private onPointerMove() {
    if (!this.scene.input.activePointer.isDown) return;

    const distanceX = this.scene.input.activePointer.getDistanceX();
    const distanceY = this.scene.input.activePointer.getDistanceY();

    let direction: Direction | undefined = undefined;

    if (distanceX > DISTANCE_THRESHOLD) {
      const deltaX = this.scene.input.activePointer.position.x - this.scene.input.activePointer.prevPosition.x;
      direction = deltaX < 0 ? Direction.LEFT : Direction.RIGHT;
    } else if (distanceY > DISTANCE_THRESHOLD) {
      const deltaY = this.scene.input.activePointer.position.y - this.scene.input.activePointer.prevPosition.y;
      direction = deltaY < 0 ? Direction.UP : Direction.DOWN;
    }

    if (direction && !this.hasSwiped) {
      this.hasSwiped = true;
      this.listeners.forEach(listener => listener(direction!));
    }
  }
}