import background from './background.js';
import randomShape from '../library/randomShape.js';
import timer from './timer.js';

export default function(setActiveShapeCallback) {
  let activeShape = randomShape(5, 2);
  let currentLevel = background();
  let frozenBlocks = [];
  let state = { activeShape: activeShape };
  activeShape.attach(currentLevel);
  setActiveShapeCallback(activeShape);
  return Object.assign({
    level: currentLevel,
    frozenBlocks: frozenBlocks,
    newActiveShape() {
      let blocks = activeShape.giveRenderables();
      blocks.forEach((block) => {
        frozenBlocks.push(block);
      });
      activeShape = randomShape(5, 2);
      state.activeShape = activeShape;
      activeShape.attach(currentLevel);
      setActiveShapeCallback(activeShape);
    },
    getActiveShape() {
      return activeShape;
    },
  }, timer(state));
}
