import { CollectCoinBehavior } from './enter/collect-coin';
import { ShowSwipeIndicatorBehavior } from './enter/show-swipe-indicator';
import { DamageActor } from './enter/damage-actor';

export const EnterBehaviors = [
  CollectCoinBehavior,
  DamageActor,
  ShowSwipeIndicatorBehavior
];
