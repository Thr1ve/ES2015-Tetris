import { initial, completed }from './data/frozenBlocks.js';
import objectEquals from '../utils/objectEquals.js';

import rowChecker from '../game/rowChecker.js';

let testChecker = rowChecker({frozenBlocks: initial});

console.log(objectEquals(completed, testChecker.checkRows()));

// this didn't end up helping...I just wrote a reduce function instead of whatever on earth I was doing before and everything just worked.
