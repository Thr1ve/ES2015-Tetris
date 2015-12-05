export default function timer(state, callbacks) {
  state.lastGameTick = Date.now();

  // TODO: I hate this. should be algorithm...
  function getTickTime() {
    let { difficulty } = state;
    switch (difficulty) {
    case 1:
      return 1500;
    case 2:
      return 1200;
    case 3:
      return 1000;
    case 4:
      return 800;
    case 5:
      return 600;
    case 6:
      return 500;
    case 7:
      return 400;
    case 8:
      return 300;
    case 9:
      return 200;
    case 10:
      return 100;
    default:
      return 100;
    }
  }

  function tick() {
    state.activeShape.moveDown();
    state.lastGameTick = Date.now();
  }

  return {
    checkTime() {
      if (Date.now() - state.lastGameTick >= getTickTime()) {
        tick();
      }
    },
  };
}
