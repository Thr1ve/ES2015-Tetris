import randomShape from '../library/randomShape.js';
import SETTINGS from '../settings.js';

export default function activeShape(state, setActiveShapeCallback) {
  function freeze() {
    newActiveShape();
  }

  function makeShape(gameState) {
    gameState.activeShape = randomShape(5, 2);
    gameState.activeShape.attach(gameState.background);
    gameState.activeShape.addCallback(moveRequest);
    gameState.activeShape.addCallback(freeze);
    setActiveShapeCallback(gameState.activeShape);
  }

  function newActiveShape() {
    state.activeShape.giveRenderables().forEach((block) => {
      state.frozenBlocks.push(block);
    });

    makeShape(state);
  }

  function frozenCollision(shapeArray) {
    return shapeArray.some(function(piece) {
      return state.frozenBlocks.some(function(block) {
        return piece.x === block.x && piece.y === block.y;
      });
    });
  }

  function getEdgeBlocks(blocks) {
    return blocks.reduce(function(result, piece) {
      if (piece.x < result.leftMost.x) {
        result.leftMost = piece;
      }
      if (piece.x > result.rightMost.x) {
        result.rightMost = piece;
      }
      if (piece.y > result.lowest.y) {
        result.lowest = piece;
      }
      return result;
    }, {leftMost: blocks[0], rightMost: blocks[0], lowest: blocks[0]});
  }

  function moveRequest(newState) {
    let edges = getEdgeBlocks(newState);
    let result = {
      isLegal: true,
    }
    if (frozenCollision(newState)) {
      result.isLegal = false;
    }
    if (edges.lowest.y >= SETTINGS.height) {
      result.isLegal = false;
    }
    if (edges.rightMost.x >= SETTINGS.width) {
      result.isLegal = false;
    }
    if (edges.leftMost.x < 0) {
      result.isLegal = false;
    }
    return result;
  }

  makeShape(state);
  return {
    getActiveShape() {
      return state.activeShape;
    },
  };
}
