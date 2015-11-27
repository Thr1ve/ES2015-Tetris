export default function timer(state) {
  state.lastGameTick = Date.now();
  state.tickTime = 1500;

  function tick() {
    state.activeShape.moveDown();
    state.lastGameTick = Date.now();
  }

  return {
    checkTime() {
      if (Date.now() - state.lastGameTick >= state.tickTime) {
        tick();
      }
    },
  };
}
