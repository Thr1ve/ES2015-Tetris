import flatten from './library/flatten.js'

export default function(width, height) {
  let grid = [];

  for (let i = 0; i < height; i++) {
    grid.push(createRow(width, i));
  }

  return {
    grid: grid,
    getCell: function(x, y) {
      return flatten(grid).filter(function(cell) {
        return cell.x === x && cell.y === y;
      })[0];
    },
  };

  function createRow(length, y) {
    let newArr = [];
    for (let i = 0; i < length; i++) {
      newArr.push(createCell(i, y));
    }
    return newArr;
  }

  function createCell(x, y) {
    let domElement = document.createElement('div');
    domElement.style.position = 'absolute';
    return {
      x: x,
      y: y,
      filled: false,
      frozen: false,
      backgroundColor: 'black',
      size: 50,
      domElement: domElement,
    };
  }
}
