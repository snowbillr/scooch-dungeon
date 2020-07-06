import { Depths } from '../../constants/depths';
import { Spikes } from './spikes';

export const dungeonObjectsList = [
  {
    name: 'rock',
    tileIndex: 50,
    texture: 'rock',
    depth: Depths.rock
  },
  {
    name: 'rock2',
    tileIndex: 60,
    texture: 'rock2',
    depth: Depths.rock
  },
  {
    name: 'objective',
    tileIndex: 85,
    texture: 'objective',
    frame: 0,
    depth: Depths.objective
  },
  {
    name: 'coin',
    tileIndex: 87,
    texture: 'coin',
    frame: 0,
    animation: 'coin-spin',
    depth: Depths.coin
  },
  {
    name: 'spikes',
    tileIndex: 101,
    texture: 'spikes',
    frame: 0,
    depth: Depths.spikes,
    klass: Spikes
  },
  {
    name: 'swipe-indicator',
    texture: 'swipe-indicator',
    frame: 0,
    animation: 'swipe-indicator-bounce',
    depth: Depths['swipe-indicator']
  }
];
