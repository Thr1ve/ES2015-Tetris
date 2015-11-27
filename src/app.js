import render from './library/render.js';
import setup from './setup.js';

function mainLoop(game) {
  let active = game.getActiveShape();
  let renderables = active.giveRenderables();
  game.checkTime();
  renderables.forEach((block) => {
    render(block);
  });

  setTimeout(mainLoop, 1000 / 60, game);
}

setup(mainLoop);
