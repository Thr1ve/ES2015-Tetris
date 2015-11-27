import shape from './shape.js';

export default function z(x, y, color) {
  let state = {};
  let mold = [
    {x: x, y: y - 1},
    {x: x + 1, y: y - 1},
    {x: x - 1, y: y},
  ];
  return Object.assign(
    {},
    shape(state, {
      center: {x: x, y: y},
      mold: mold,
      color: color,
    })
  );
}
