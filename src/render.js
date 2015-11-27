export default function(cell) {
  let domElement = cell.domElement;
  if (domElement === undefined) {
    console.log(cell);
  }
  domElement.style.backgroundColor = cell.backgroundColor;
  domElement.style.left = cell.size * cell.x + 'px';
  domElement.style.top = cell.size * cell.y + 'px';
  domElement.style.height = cell.size + 'px';
  domElement.style.width = cell.size + 'px';
}
