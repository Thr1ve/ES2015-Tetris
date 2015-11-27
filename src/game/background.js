import SETTINGS from '../settings.js';

export default function background() {
  let { height, width, cellSize } = SETTINGS;
  let level = document.createElement('div');
  level.id = 'level';
  level.style.position = 'relative';
  level.style.backgroundColor = 'black';
  level.style.height = height * cellSize + 'px';
  level.style.width = width * cellSize + 'px';
  document.body.appendChild(level);
  return level;
}
