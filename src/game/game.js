import background from './background.js';
import activeShape from './activeShape.js';
import timer from './timer.js';
import rowChecker from './rowChecker.js';
import score from './score.js';
import difficulty from './difficulty.js';

export default function(setActiveShapeCallback) {
  let state = {
    background: background(),
    frozenBlocks: [],
    score: 0,
    difficulty: 1,
  };

  let callbacks = { setActiveShapeCallback };

  return Object.assign(
    {
      getRenderables() {
        return state.frozenBlocks.concat(callbacks.getActiveShape());
      },
    },
    timer(state, callbacks),
    activeShape(state, callbacks),
    rowChecker(state, callbacks),
    score(state, callbacks),
    difficulty(state, callbacks)
  );
}
