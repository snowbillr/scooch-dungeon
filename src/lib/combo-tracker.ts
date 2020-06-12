const LEVELS = [
  {
    multiplier: 1,
    steps: 4,
    max: false
  },
  {
    multiplier: 2,
    steps: 5,
    max: false
  },
  {
    multiplier: 3,
    steps: 6,
    max: false
  },
  {
    multiplier: 4,
    steps: 0,
    max: true
  }
];

export class ComboTracker {
  private currentLevel: number;
  private currentStep: number;

  constructor() {
    this.currentLevel = 0;
    this.currentStep = 0;
  }

  increment() {
    if (LEVELS[this.currentLevel].max) return;

    this.currentStep += 1;
    if (this.currentStep > LEVELS[this.currentLevel].steps - 1) {
      this.currentLevel += 1;
      this.currentStep = 0;
    }
  }

  reset() {
    this.currentLevel = 0;
    this.currentStep = 0;
  }

  getMultiplier() {
    return LEVELS[this.currentLevel].multiplier;
  }

  getStep() {
    return this.currentStep;
  }
}
