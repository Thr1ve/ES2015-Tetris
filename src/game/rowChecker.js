import { width as boardWidth, height as boardHeight } from '../settings.js';

export default function(state, callbacks) {
  function removeRow(n) {
    state.frozenBlocks = state.frozenBlocks.filter(function(block) {
      return block.y !== n;
    });
  }

  function pullDown(fullRows) {
    state.frozenBlocks = fullRows.reduce(function(prev, cur) {
      block.y += 1;
      return block;
    });
  }

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
    checkRows() {
      let fullRows = organizeByRow(state.frozenBlocks).reduce(function(result, row, ind) {
        if (row.length >= boardWidth) {
          result.push({rowNumber: ind, blocks: row});
        }
        return result;
      }, []);
      let completedRows = fullRows.length;
      if (completedRows > 0) {
        fullRows.forEach(function(row) {
          row.blocks.forEach(function(block) {
            state.background.removeChild(block.domElement);
          });
          removeRow(row.rowNumber);
        });
        pullDown(fullRows);
        callbacks.updateScore(completedRows);
      }
    },
  };
}
