export default function(x, y) {
  let arr = [
    {x: 0, y: 1},
    {x: 0, y: -1},
    {x: 0, y: -2},
    {x: 1, y: -2},
  ];
  return {
    arr: arr,
    center: {x: x, y: y},
    falling: true,
  };
}
