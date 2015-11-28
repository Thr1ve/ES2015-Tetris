import background from './background.js';
import activeShape from './activeShape.js';
import timer from './timer.js';

export default function(setActiveShapeCallback) {
  let state = {
    background: background(),
    frozenBlocks: [],
  };

  return Object.assign({},
  timer(state),
  activeShape(state, setActiveShapeCallback));
}
