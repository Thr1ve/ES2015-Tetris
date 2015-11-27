import grid from './grid.js';
import compare from './library/compare.js';
import flatten from './library/flatten.js';
import render from './render.js';
import LBlock from './blocks/LBlock.js';

function fillCell(cell, color) {
  return Object.assign(cell, {
    filled: true,
    backgroundColor: color,
  });
}

function createLevel() {
  let level = document.createElement('div');
  level.id = 'level';
  level.style.position = 'relative';
  document.body.appendChild(level);
  return level;
}

function setup(width, height) {
  let level = createLevel();
  let gameBoard = grid(width, height);

  flatten(gameBoard.grid).forEach(function(cell) {
    level.appendChild(cell.domElement);
    render(cell);
  });

  mainLoop(gameBoard);
}

function mainLoop(gameBoard) {
  let flattened = flatten(gameBoard.grid);
  // let flattened = flatten(gameBoard.grid).map(function(cell) {
  //   if (cell.x === one.center.x && cell.y === one.center.y) {
  //     cell.backgroundColor = 'blue';
  //     return cell;
  //   }
  //   return cell;
  // });

  flattened.forEach(function(cell) {
    render(cell);
  });

  setTimeout(mainLoop, 1000 / 60, gameBoard);
}

setup(25, 12);
