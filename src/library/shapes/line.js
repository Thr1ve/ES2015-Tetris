import shape from './shape.js';

export default function(x, y, color) {
  let state = {};
  let mold = [
    {x: x - 1, y: y},
    {x: x + 1, y: y},
    {x: x + 2, y: y},
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
