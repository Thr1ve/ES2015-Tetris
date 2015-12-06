import background from './background.js';
import shapeController from './shapeController.js';
import timer from './timer.js';
import rowChecker from './rowChecker.js';
import score from './score.js';
import difficulty from './difficulty.js';
import end from './end.js';

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
    shapeController(state, callbacks),
    rowChecker(state, callbacks),
    score(state, callbacks),
    difficulty(state, callbacks),
    end(state, callbacks)
  );
}
