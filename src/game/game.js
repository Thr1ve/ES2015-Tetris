import SETTINGS from '../settings.js';
import randomShape from '../library/randomShape.js';
import timer from './timer.js';

function background() {
  let { height, width, cellSize } = SETTINGS;
  let level = document.createElement('div');
  level.id = 'level';
  level.style.position = 'relative';
  level.style.backgroundColor = 'black';
  level.style.height = height * cellSize + 'px';
  level.style.width = width * cellSize + 'px';
  document.body.appendChild(level);
  return level;
}

export default function(setActiveShapeCallback) {
  let activeShape = randomShape(5, 2);
  let state = { activeShape: activeShape };
  let currentLevel = background();
  let frozenBlocks = [];
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
