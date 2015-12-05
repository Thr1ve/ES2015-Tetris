export default function score(state, callbacks) {

  let scoreBoard = document.createElement('div')
  document.body.appendChild(scoreBoard);

  function updateScore(completedRows) {
    let points = getPoints(completedRows);
    state.score += points;
    scoreBoard.innerText = 'Score: ' + state.score;
  }

  // TODO: This should be an algorithm
  function getPoints(n) {
    if (n === 1) {
      return 100;
    } else if (n === 2) {
      return 250;
    } else if ( n === 3) {
      return 300;
    } else if ( n === 4) {
      return 500;
    }
    return 0;
  }

  callbacks.updateScore = updateScore;

  return {};
}
