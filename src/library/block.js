export default function block(x, y, color) {
  let state = {
    backgroundColor: color || 'blue',
    x: x,
    y: y,
  };
  let domElement = document.createElement('div');
  domElement.style.position = 'absolute';
  domElement.style.backgroundColor = color || 'blue';

  return {
    domElement: domElement,
    getRenderables() {
      return {
        x: state.x,
        y: state.y,
        backgroundColor: state.backgroundColor,
      };
    },
    setRenderables(coords) {
      state.x = coords.x;
      state.y = coords.y;
      state.backgroundColor = coords.backgroundColor || state.backgroundColor;
    },
  };
}
