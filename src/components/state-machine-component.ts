import { PhiniteStateMachine } from 'phinite-state-machine';
import { Entity } from 'phecs/dist/entity';
import { DungeonScene } from '../scenes/dungeon-scene';

export class StateMachineComponent {
  private scene: DungeonScene;
  private data: any;
  private entity: Entity;

  public stateMachine!: PhiniteStateMachine<Entity, DungeonScene>;

  constructor(scene: Phaser.Scene, data: any, entity: Entity) {
    this.scene = scene as DungeonScene;
    this.data = data;
    this.entity = entity;
  }

  onAdd() {
    this.stateMachine = new PhiniteStateMachine<Entity, DungeonScene>(this.scene, this.entity, this.data.states, this.data.initialState);
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
