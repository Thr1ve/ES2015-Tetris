export default function handleKeys() {
  var activeShape;
  return {
    listener(event) {
      let { keyCode } = event;
      // console.log(keyCode);
      const keyMap = {
        a: () => {
          activeShape.moveLeft();
        },
        d: () => {
          activeShape.moveRight();
        },
        s: () => {
          activeShape.moveDown();
        },
        e: () => {
          activeShape.rotateRight();
        },
        q: () => {
          activeShape.rotateLeft();
        },
      };

      switch (keyCode) {
      case 65:
        event.preventDefault();
        keyMap.a();
        break;
      case 68:
        event.preventDefault();
        keyMap.d();
        break;
      case 69:
        event.preventDefault();
        keyMap.e();
        break;
      case 81:
        event.preventDefault();
        keyMap.q();
        break;
      case 83:
        event.preventDefault();
        keyMap.s();
        break;
      default:
        break;
      }
    },
    setNewActiveShape(newActiveShape) {
      console.log('new active shape: ', newActiveShape);
      activeShape = newActiveShape;
    }
  };
}
