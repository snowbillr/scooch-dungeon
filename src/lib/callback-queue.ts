// https://codepen.io/snowbillr/pen/vYNaEJd?editors=1111
// Phaser doesn't reliably call timeline tween's callbacks in order.
// This utility class enforces callback order in tandem with the timeline.

type Callback = () => void;

export class CallbackQueue {
  private callbacks: Callback[];
  private currentIndex: number;

  constructor() {
    this.callbacks = [];
    this.currentIndex = 0;
  }

  addCallback(callback: Callback) {
    this.callbacks.push(callback);
  }

  runNext() {
    this.callbacks[this.currentIndex]();

    this.currentIndex += 1;
  }
}
