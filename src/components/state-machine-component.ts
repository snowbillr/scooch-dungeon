import { PhiniteStateMachine } from 'phinite-state-machine';

export class StateMachineComponent<T> {
  private scene: Phaser.Scene;
  private data: any;
  private entity: T;
  
  public stateMachine!: PhiniteStateMachine<T>;

  constructor(scene: Phaser.Scene, data: any, entity: T) {
    this.scene = scene;
    this.data = data;
    this.entity = entity;
  }

  onAdd() {
    this.stateMachine = new PhiniteStateMachine(this.scene, this.entity, this.data.states, this.data.initialState);
    this.stateMachine.start();

    this.scene.events.on(Phaser.Scenes.Events.POST_UPDATE, () => this.updateStateMachine);
  }

  destroy() {
    this.scene.events.off(Phaser.Scenes.Events.POST_UPDATE, () => this.updateStateMachine);
  }

  private updateStateMachine() {
    this.stateMachine.update();
  }

}