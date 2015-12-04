import render from './library/render.js';
import setup from './setup.js';

function mainLoop(game) {
  game.checkTime();
  game.checkRows();
  let renderables = game.getRenderables();
  renderables.forEach((block) => {
    render(block);
  });

  setTimeout(mainLoop, 1000 / 60, game);
}

setup(mainLoop);
