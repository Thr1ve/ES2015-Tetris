export default function() {
  var activeShape;
  return {
    listener(event) {
      let { keyCode } = event;

      const keyMap = {
        a: () => {
          console.log('a');
          console.log('active shape: ', activeShape);
          activeShape.moveLeft()
        },
        d: () => {
          console.log('d');
          console.log('active shape: ', activeShape);
          activeShape.moveRight()
        },
        s: () => {
          console.log('s');
          console.log('active shape: ', activeShape);
          activeShape.moveDown()
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
