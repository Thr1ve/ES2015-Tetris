export default function end(state, callbacks) {
  return {
    end() {
      document.body.removeChild(state.background);
      let gameOver = document.createElement('div');
      gameOver.style.position = 'relative';
      gameOver.innerText = 'Game Over. Refresh the Page to play again!';
      document.body.appendChild(gameOver);
    },
    gameOver() {
      return state.frozenBlocks.some(function(left) {
        let nBlocks = state.frozenBlocks.filter(function(right) {
          return left.x === right.x && left.y === right.y;
        });
        if (nBlocks.length > 1) {
          return true;
        }
        return false;
      });
    },
  };
}
