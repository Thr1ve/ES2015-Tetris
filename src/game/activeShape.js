import randomShape from '../library/randomShape.js';

export default function activeShape(state, setActiveShapeCallback) {
  state.activeShape = randomShape(5, 2);
  state.activeShape.attach(state.background);
  setActiveShapeCallback(state.activeShape);
  return {
    newActiveShape() {
      state.activeShape.giveRenderables.forEach((block) => {
        state.frozenBlocks.push(block);
      });

      state.activeShape = randomShape(5, 2);
      state.activeShape.attach(state.background);
      setActiveShapeCallback(state.activeShape);
    },
    getActiveShape() {
      return state.activeShape;
    },
  };
}
