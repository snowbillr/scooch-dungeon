// https://codepen.io/snowbillr/pen/vYNaEJd?editors=1111
// Phaser doesn't reliably call timeline tween's callbacks in order.
// This utility class enforces callback order in tandem with the timeline.

type CallbackDescriptor = {
  callback: () => void;
  hasRun: boolean;
}

export class CallbackOrderEnforcer {
  private callbacks: CallbackDescriptor[];
  private currentIndex: number;

  constructor() {
    this.callbacks = [];
    this.currentIndex = 0;
  }

  addCallback(callback: () => void) {
    this.callbacks.push({
      callback,
      hasRun: false
    });
  }

  runNext() {
    this.callbacks[this.currentIndex].callback();
    this.callbacks[this.currentIndex].hasRun = true;

    this.currentIndex += 1;
  }

  /*
  executeUpTo(index: number) {
    const callbacksToExecute = this.callbacks.filter((cb, i) => !cb.hasRun && i <= index);
    callbacksToExecute.forEach(cb => {
      cb.callback();
      cb.hasRun = true;
    });
  }
  */
}
