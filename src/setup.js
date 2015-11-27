import handleKeys from './library/handleKeys.js';
import game from './game/game.js';

export default function setup(gameLoop) {
  let handler = handleKeys();
  let newGame = game(handler.setNewActiveShape);

  document.onkeydown = handler.listener;
  gameLoop(newGame);
}
