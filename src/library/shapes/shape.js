import block from '../block.js';

export default function(state, opts) {
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
