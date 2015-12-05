import block from '../block.js';
import SETTINGS from '../../settings.js';

export default function shape(state, opts) {
  let callbacks = {};
  state.listening = true;
  state.blocks = [];
  state.blocks.push(block(opts.center.x, opts.center.y, opts.color));
  opts.mold.forEach((piece) => {
    state.blocks.push(block(piece.x, piece.y, opts.color));
  });

  function setRenderables(newStateArray) {
    state.blocks.forEach(function(piece, ind) {
      piece.setRenderables(newStateArray[ind]);
    });
  }

  return {
    giveRenderables() {
      return state.blocks.map((piece) => {
        return Object.assign({domElement: piece.domElement}, piece.getRenderables());
      });
    },

    addCallback(func) {
      callbacks[func.name] = func;
    },

    // TODO: instead of having all of this logic here and accepting a call-back, should we just move it to activeShape.js
    moveRight() {
      let newLoc = state.blocks.map(function(piece) {
        let coords = piece.getRenderables();
        coords.x += 1;
        return coords;
      });
      if (callbacks.moveRequest(newLoc).isLegal) {
        setRenderables(newLoc);
      }
    },

    moveLeft() {
      let newLoc = state.blocks.map(function(piece) {
        let coords = piece.getRenderables();
        coords.x -= 1;
        return coords;
      });
      if (callbacks.moveRequest(newLoc).isLegal) {
        setRenderables(newLoc);
      }
    },

    moveDown() {
      let newLoc = state.blocks.map(function(piece) {
        let coords = piece.getRenderables();
        coords.y += 1;
        return coords;
      });
      if (callbacks.moveRequest(newLoc).isLegal) {
        setRenderables(newLoc);
      } else {
        callbacks.freeze();
      }
    },

    rotateRight() {
      let {x: centerX, y: centerY} = state.blocks[0].getRenderables();
      let newLoc = state.blocks.map((piece) => {
        let { x, y } = piece.getRenderables();
        let xOffset = centerX - x;
        let yOffset = centerY - y;
        return {x: centerX + yOffset, y: centerY - xOffset};
      });
      if (callbacks.moveRequest(newLoc).isLegal) {
        setRenderables(newLoc);
      }
    },

    rotateLeft() {
      let {x: centerX, y: centerY} = state.blocks[0].getRenderables();
      let newLoc = state.blocks.map((piece) => {
        let { x, y } = piece.getRenderables();
        let xOffset = centerX - x;
        let yOffset = centerY - y;
        return {x: centerX - yOffset, y: centerY + xOffset};
      });
      if (callbacks.moveRequest(newLoc).isLegal) {
        setRenderables(newLoc);
      }
    },

    attach(dom) {
      state.blocks.forEach((piece) => {
        dom.appendChild(piece.domElement);
      });
    },
  };
}
