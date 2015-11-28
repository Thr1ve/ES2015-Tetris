import SETTINGS from '../settings.js';

export default function background() {
  let { height, width, cellSize } = SETTINGS;
  let levelBackground = document.createElement('div');
  levelBackground.id = 'levelBackground';
  levelBackground.style.position = 'relative';
  levelBackground.style.backgroundColor = 'black';
  levelBackground.style.height = height * cellSize + 'px';
  levelBackground.style.width = width * cellSize + 'px';
  document.body.appendChild(levelBackground);
  return levelBackground;
}
