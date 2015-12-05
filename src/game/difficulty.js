export default function difficulty(state, callbacks) {
  function decideDifficulty(score) {
    return Math.floor(score / 1000) + 1;
  }

  callbacks.setDifficulty = function setDifficulty() {
    state.difficulty = decideDifficulty(state.score);
  };

  return {};
}
