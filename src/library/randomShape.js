import shapes from './shapes.js';
import { colors } from '../settings.js';
import random from '../utils/random.js';

export default function randomShape(x, y) {
  let color = random(colors);
  let shape = random(shapes);
  return shape(x, y, color);
}
