import SETTINGS from '../settings.js';
const boardWidth = SETTINGS.width;

export default function(state, callbacks) {
  function organizeByRow(frozenBlocks) {
    return frozenBlocks.reduce(function(result, current) {
      let row = current.y;
      if (!result[row]) {
        result[row] = [];
      }
      result[row].push(current);
      return result;
    }, []);
  }

  return {
    // TODO: Too dense? Should this be split into smaller functions?
    checkRows() {
      let byRow = organizeByRow(state.frozenBlocks);
      let { blocks, currentShift } = byRow.reduceRight(function(result, current) {
        if (!current) {
          return result;
        } if (current.length >= boardWidth) {
          result.currentShift += 1;
          current.forEach(function(block) {
            state.background.removeChild(block.domElement);
          });
          return result;
        } else {
          result.blocks = result.blocks.concat(current.map(function(block) {
            block.y += result.currentShift;
            return block;
          }));
          return result;
        }
      }, {currentShift: 0, blocks: []});
      state.frozenBlocks = blocks;
      callbacks.updateScore(currentShift);
    },
  };
}
