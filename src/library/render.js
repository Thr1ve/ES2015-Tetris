import SETTINGS from '../settings.js';

export default function(block) {
  let { cellSize } = SETTINGS;
  let domElement = block.domElement;
  domElement.style.backgroundColor = block.backgroundColor;
  domElement.style.left = cellSize * block.x + 'px';
  domElement.style.top = cellSize * block.y + 'px';
  domElement.style.height = cellSize + 'px';
  domElement.style.width = cellSize + 'px';
}
