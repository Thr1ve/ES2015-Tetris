// Don't have internet right now. Having trouble figuring out the translation needed to rotate blocks to the right

/*

_ _ _ _ _
_ _ 1 _ _
_ _ C _ _
_ _ 2 3 _
_ _ _ _ _

x: 0, y: +1
x: 0, y: -1
x: +1, y: -1

_ _ _ _ _
_ _ _ _ _
_ 2 C 1 _
_ 3 _ _ _
_ _ _ _ _

x: +1, y: 0
x: -1, y: 0
x: -1, y: -1

_ _ _ _ _
_ 3 2 _ _
_ _ C _ _
_ _ 1 _ _
_ _ _ _ _

x: 0, y: -1
x: 0, y: +1
x: -1, y: +1


x: 0, y: +1
->
x: +1, y: 0
->
x: 0, y: -1


x: 0, y: -1
->
x: -1, y: 0
->
x: 0, y: +1


x: +1, y: -1
->
x: -1, y: -1
->
x: -1, y: +1

*/

function assert(a, b) {
  console.log(a === b);
}

var obj1 = {
  x: 1,
  y: -1,
};

var obj2 = {
  x: -1,
  y: -1,
};

var obj3 = {
  x: -1,
  y: 1,
};

function translate(obj) {
  var resultX = obj.y;
  var resultY = -obj.x;
  return {
    x: resultX,
    y: resultY,
  };
}

var test1 = translate(obj1);
console.log('x: ');
assert(test1.x, obj2.x);
console.log('y: ');
assert(test1.y, obj2.y);
console.log('\n');
var test2 = translate(obj2);
console.log('x: ');
assert(test2.x, obj3.x);
console.log('y: ');
assert(test2.y, obj3.y);
console.log('\n');
