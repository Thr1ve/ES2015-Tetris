import block from '../block.js';

export default function shape(state, opts) {
  state.listening = true;
  state.blocks = [];
  state.blocks.push(block(opts.center.x, opts.center.y, opts.color));
  opts.mold.forEach((piece) => {
    state.blocks.push(block(piece.x, piece.y, opts.color));
  });

  function move(transObj) {
    state.blocks.forEach((piece) => {
      piece.shift(transObj);
    });
  }

  return {
    giveRenderables() {
      return state.blocks.map((piece) => {
        return Object.assign({domElement: piece.domElement}, piece.getRenderables());
      });
    },

    moveRight() {
      move({x: 1});
    },

    moveLeft() {
      move({x: -1});
    },

    moveDown() {
      move({y: 1});
    },

    rotateRight() {
      let {x: centerX, y: centerY} = state.blocks[0].getRenderables();
      return state.blocks.map((piece) => {
        let { x, y } = piece.getRenderables();
        let xOffset = centerX - x;
        let yOffset = centerY - y;
        return {x: centerX + yOffset, y: centerY - xOffset};
      });
    },

    rotateLeft() {
      let {x: centerX, y: centerY} = state.blocks[0].getRenderables();
      return state.blocks.map((piece) => {
        let { x, y } = piece.getRenderables();
        let xOffset = centerX - x;
        let yOffset = centerY - y;
        return {x: centerX - yOffset, y: centerY + xOffset};
      });
    },

    attach(dom) {
      state.blocks.forEach((piece) => {
        dom.appendChild(piece.domElement);
      });
    },

    freeze() {
      state.listening = false;
      state.blocks.forEach((piece) => {
        piece.freeze();
      });
      return state.blocks;
    },
  };
}
