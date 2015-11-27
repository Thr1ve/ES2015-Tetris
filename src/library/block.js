export default function block(x, y, color) {
  let domElement = document.createElement('div');
  domElement.style.position = 'absolute';
  domElement.style.backgroundColor = color || 'blue';
  let state = {
    frozen: false,
    backgroundColor: color || 'blue',
    x: x,
    y: y,
  };
  return {
    domElement: domElement,
    getRenderables() {
      return {
        x: state.x,
        y: state.y,
        backgroundColor: state.backgroundColor,
      };
    },
    freeze() {
      state.frozen = true;
    },
    isFrozen() {
      return state.frozen;
    },
    set(coords) {
      state.x = coords.x || state.x;
      state.y = coords.y || state.y;
    },
    shift(transObj) {
      state.x = state.x + (transObj.x || 0);
      state.y = state.y + (transObj.y || 0);
    },
  };
}
