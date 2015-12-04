import handleKeys from './library/handleKeys.js';
import game from './game/game.js';

export default function setup(gameLoop) {
  console.log('deploy script test2');
  let handler = handleKeys();
  let newGame = game(handler.setNewActiveShape);

  document.onkeydown = handler.listener;
  gameLoop(newGame);
}
