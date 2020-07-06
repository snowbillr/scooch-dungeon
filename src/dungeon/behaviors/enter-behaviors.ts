import { CollectCoinBehavior } from './enter/collect-coin';
import { ShowSwipeIndicatorBehavior } from './enter/show-swipe-indicator';
import { DamageActorBehavior } from './enter/damage-actor';

export const EnterBehaviors = [
  CollectCoinBehavior,
  DamageActorBehavior,
  ShowSwipeIndicatorBehavior
];
