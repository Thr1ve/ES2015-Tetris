(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _render = require('./library/render.js');

var _render2 = _interopRequireDefault(_render);

var _setup = require('./setup.js');

var _setup2 = _interopRequireDefault(_setup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mainLoop(game) {
  game.checkTime();
  game.checkRows();
  var renderables = game.getRenderables();
  renderables.forEach(function (block) {
    (0, _render2.default)(block);
  });

  setTimeout(mainLoop, 1000 / 60, game);
}

(0, _setup2.default)(mainLoop);

},{"./library/render.js":11,"./setup.js":20}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = activeShape;

var _randomShape = require('../library/randomShape.js');

var _randomShape2 = _interopRequireDefault(_randomShape);

var _settings = require('../settings.js');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function activeShape(state, callbacks) {
  function freeze() {
    newActiveShape();
  }

  function moveRequest(newState) {
    var edges = getEdgeBlocks(newState);
    var result = {
      isLegal: true
    };
    if (frozenCollision(newState)) {
      result.isLegal = false;
    }
    if (edges.lowest.y >= _settings2.default.height) {
      result.isLegal = false;
    }
    if (edges.rightMost.x >= _settings2.default.width) {
      result.isLegal = false;
    }
    if (edges.leftMost.x < 0) {
      result.isLegal = false;
    }
    return result;
  }

  function getEdgeBlocks(blocks) {
    return blocks.reduce(function (result, piece) {
      if (piece.x < result.leftMost.x) {
        result.leftMost = piece;
      }
      if (piece.x > result.rightMost.x) {
        result.rightMost = piece;
      }
      if (piece.y > result.lowest.y) {
        result.lowest = piece;
      }
      return result;
    }, { leftMost: blocks[0], rightMost: blocks[0], lowest: blocks[0] });
  }

  function frozenCollision(shapeArray) {
    return shapeArray.some(function (piece) {
      return state.frozenBlocks.some(function (block) {
        return piece.x === block.x && piece.y === block.y;
      });
    });
  }

  function makeShape(gameState) {
    gameState.activeShape = (0, _randomShape2.default)(1, 2);
    gameState.activeShape.attach(gameState.background);
    gameState.activeShape.addCallback(moveRequest);
    gameState.activeShape.addCallback(freeze);
    callbacks.setActiveShapeCallback(gameState.activeShape);
  }

  function newActiveShape() {
    state.activeShape.giveRenderables().forEach(function (block) {
      state.frozenBlocks.push(block);
    });

    makeShape(state);
  }

  callbacks.getActiveShape = function () {
    return state.activeShape.giveRenderables();
  };

  makeShape(state);

  return {};
}

},{"../library/randomShape.js":10,"../settings.js":19}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = background;

var _settings = require('../settings.js');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function background() {
  var height = _settings2.default.height;
  var width = _settings2.default.width;
  var cellSize = _settings2.default.cellSize;

  var levelBackground = document.createElement('div');
  levelBackground.id = 'levelBackground';
  levelBackground.style.position = 'relative';
  levelBackground.style.backgroundColor = '#002b36';
  levelBackground.style.height = height * cellSize + 'px';
  levelBackground.style.width = width * cellSize + 'px';
  document.body.appendChild(levelBackground);
  return levelBackground;
}

},{"../settings.js":19}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (setActiveShapeCallback) {
  var state = {
    background: (0, _background2.default)(),
    frozenBlocks: [],
    score: 0
  };

  var callbacks = { setActiveShapeCallback: setActiveShapeCallback };

  return Object.assign({
    getRenderables: function getRenderables() {
      return state.frozenBlocks.concat(callbacks.getActiveShape());
    }
  }, (0, _timer2.default)(state), (0, _activeShape2.default)(state, callbacks), (0, _rowChecker2.default)(state, callbacks), (0, _score2.default)(state, callbacks));
};

var _background = require('./background.js');

var _background2 = _interopRequireDefault(_background);

var _activeShape = require('./activeShape.js');

var _activeShape2 = _interopRequireDefault(_activeShape);

var _timer = require('./timer.js');

var _timer2 = _interopRequireDefault(_timer);

var _rowChecker = require('./rowChecker.js');

var _rowChecker2 = _interopRequireDefault(_rowChecker);

var _score = require('./score.js');

var _score2 = _interopRequireDefault(_score);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./activeShape.js":2,"./background.js":3,"./rowChecker.js":5,"./score.js":6,"./timer.js":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, callbacks) {
  function organizeByRow(frozenBlocks) {
    return frozenBlocks.reduce(function (result, current) {
      var row = current.y;
      if (!result[row]) {
        result[row] = [];
      }
      result[row].push(current);
      return result;
    }, []);
  }

  return {
    checkRows: function checkRows() {
      var byRow = organizeByRow(state.frozenBlocks);

      var _byRow$reduceRight = byRow.reduceRight(function (result, current) {
        if (!current) {
          return result;
        }if (current.length >= boardWidth) {
          result.currentShift += 1;
          current.forEach(function (block) {
            state.background.removeChild(block.domElement);
          });
          return result;
        } else {
          result.blocks = result.blocks.concat(current.map(function (block) {
            block.y += result.currentShift;
            return block;
          }));
          return result;
        }
      }, { currentShift: 0, blocks: [] });

      var blocks = _byRow$reduceRight.blocks;
      var currentShift = _byRow$reduceRight.currentShift;

      state.frozenBlocks = blocks;
      callbacks.updateScore(currentShift);
    }
  };
};

var _settings = require('../settings.js');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boardWidth = _settings2.default.width;
var boardHeight = _settings2.default.height;

},{"../settings.js":19}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = score;
function score(state, callbacks) {

  var scoreBoard = document.createElement('div');
  document.body.appendChild(scoreBoard);

  function updateScore(completedRows) {
    var points = getPoints(completedRows);
    state.score += points;
    scoreBoard.innerText = 'Score: ' + state.score;
  }

  function getPoints(n) {
    if (n === 1) {
      return 100;
    } else if (n === 2) {
      return 250;
    } else if (n === 3) {
      return 300;
    } else if (n === 4) {
      return 500;
    }
    return 0;
  }

  callbacks.updateScore = updateScore;

  return {};
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = timer;
function timer(state) {
  state.lastGameTick = Date.now();
  state.tickTime = 1500;

  function tick() {
    state.activeShape.moveDown();
    state.lastGameTick = Date.now();
  }

  return {
    checkTime: function checkTime() {
      if (Date.now() - state.lastGameTick >= state.tickTime) {
        tick();
      }
    }
  };
}

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = block;
function block(x, y, color) {
  var state = {
    backgroundColor: color || 'blue',
    x: x,
    y: y
  };
  var domElement = document.createElement('div');
  domElement.style.position = 'absolute';
  domElement.style.backgroundColor = color || 'blue';

  return {
    domElement: domElement,
    getRenderables: function getRenderables() {
      return {
        x: state.x,
        y: state.y,
        backgroundColor: state.backgroundColor
      };
    },
    setRenderables: function setRenderables(coords) {
      state.x = coords.x;
      state.y = coords.y;
      state.backgroundColor = coords.backgroundColor || state.backgroundColor;
    }
  };
}

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleKeys;
function handleKeys() {
  var activeShape;
  return {
    listener: function listener(event) {
      var keyCode = event.keyCode;
      // console.log(keyCode);

      var keyMap = {
        a: function a() {
          activeShape.moveLeft();
        },
        d: function d() {
          activeShape.moveRight();
        },
        s: function s() {
          activeShape.moveDown();
        },
        e: function e() {
          activeShape.rotateRight();
        },
        q: function q() {
          activeShape.rotateLeft();
        }
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
    setNewActiveShape: function setNewActiveShape(newActiveShape) {
      activeShape = newActiveShape;
    }
  };
}

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = randomShape;

var _shapes = require('./shapes.js');

var _shapes2 = _interopRequireDefault(_shapes);

var _settings = require('../settings.js');

var _settings2 = _interopRequireDefault(_settings);

var _random = require('../utils/random.js');

var _random2 = _interopRequireDefault(_random);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function randomShape(x, y) {
  var color = (0, _random2.default)(_settings2.default.colors);
  var shape = (0, _random2.default)(_shapes2.default);
  return shape(x, y, color);
}

},{"../settings.js":19,"../utils/random.js":21,"./shapes.js":12}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = render;

var _settings = require('../settings.js');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(block) {
  var cellSize = _settings2.default.cellSize;

  var domElement = block.domElement;
  domElement.style.backgroundColor = block.backgroundColor;
  domElement.style.left = cellSize * block.x + 'px';
  domElement.style.top = cellSize * block.y + 'px';
  domElement.style.height = cellSize + 'px';
  domElement.style.width = cellSize + 'px';
}

},{"../settings.js":19}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _corner = require('./shapes/corner.js');

var _corner2 = _interopRequireDefault(_corner);

var _l = require('./shapes/l.js');

var _l2 = _interopRequireDefault(_l);

var _line = require('./shapes/line.js');

var _line2 = _interopRequireDefault(_line);

var _square = require('./shapes/square.js');

var _square2 = _interopRequireDefault(_square);

var _z = require('./shapes/z.js');

var _z2 = _interopRequireDefault(_z);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  corner: _corner2.default,
  l: _l2.default,
  line: _line2.default,
  square: _square2.default,
  z: _z2.default
};

},{"./shapes/corner.js":13,"./shapes/l.js":14,"./shapes/line.js":15,"./shapes/square.js":17,"./shapes/z.js":18}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = corner;

var _shape = require('./shape.js');

var _shape2 = _interopRequireDefault(_shape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function corner(x, y, color) {
  var state = {};
  var mold = [{ x: x + 1, y: y }, { x: x, y: y + 1 }];
  return Object.assign({}, (0, _shape2.default)(state, {
    center: { x: x, y: y },
    mold: mold,
    color: color
  }));
}

},{"./shape.js":16}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = l;

var _shape = require('./shape.js');

var _shape2 = _interopRequireDefault(_shape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function l(x, y, color) {
  var state = {};
  var mold = [{ x: x + 1, y: y }, { x: x + 2, y: y }, { x: x, y: y - 1 }];
  return Object.assign({}, (0, _shape2.default)(state, {
    center: { x: x, y: y },
    mold: mold,
    color: color
  }));
}

},{"./shape.js":16}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = line;

var _shape = require('./shape.js');

var _shape2 = _interopRequireDefault(_shape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function line(x, y, color) {
  var state = {};
  var mold = [{ x: x - 1, y: y }, { x: x + 1, y: y }, { x: x + 2, y: y }];
  return Object.assign({}, (0, _shape2.default)(state, {
    center: { x: x, y: y },
    mold: mold,
    color: color
  }));
}

},{"./shape.js":16}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shape;

var _block = require('../block.js');

var _block2 = _interopRequireDefault(_block);

var _settings = require('../../settings.js');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function shape(state, opts) {
  var callbacks = {};
  state.listening = true;
  state.blocks = [];
  state.blocks.push((0, _block2.default)(opts.center.x, opts.center.y, opts.color));
  opts.mold.forEach(function (piece) {
    state.blocks.push((0, _block2.default)(piece.x, piece.y, opts.color));
  });

  function setRenderables(newStateArray) {
    state.blocks.forEach(function (piece, ind) {
      piece.setRenderables(newStateArray[ind]);
    });
  }

  return {
    giveRenderables: function giveRenderables() {
      return state.blocks.map(function (piece) {
        return Object.assign({ domElement: piece.domElement }, piece.getRenderables());
      });
    },
    addCallback: function addCallback(func) {
      callbacks[func.name] = func;
    },
    moveRight: function moveRight() {
      var newLoc = state.blocks.map(function (piece) {
        var coords = piece.getRenderables();
        coords.x += 1;
        return coords;
      });
      if (callbacks.moveRequest(newLoc).isLegal) {
        setRenderables(newLoc);
      }
    },
    moveLeft: function moveLeft() {
      var newLoc = state.blocks.map(function (piece) {
        var coords = piece.getRenderables();
        coords.x -= 1;
        return coords;
      });
      if (callbacks.moveRequest(newLoc).isLegal) {
        setRenderables(newLoc);
      }
    },
    moveDown: function moveDown() {
      var newLoc = state.blocks.map(function (piece) {
        var coords = piece.getRenderables();
        coords.y += 1;
        return coords;
      });
      if (callbacks.moveRequest(newLoc).isLegal) {
        setRenderables(newLoc);
      } else {
        callbacks.freeze();
      }
    },
    rotateRight: function rotateRight() {
      var _state$blocks$0$getRe = state.blocks[0].getRenderables();

      var centerX = _state$blocks$0$getRe.x;
      var centerY = _state$blocks$0$getRe.y;

      var newLoc = state.blocks.map(function (piece) {
        var _piece$getRenderables = piece.getRenderables();

        var x = _piece$getRenderables.x;
        var y = _piece$getRenderables.y;

        var xOffset = centerX - x;
        var yOffset = centerY - y;
        return { x: centerX + yOffset, y: centerY - xOffset };
      });
      if (callbacks.moveRequest(newLoc).isLegal) {
        setRenderables(newLoc);
      }
    },
    rotateLeft: function rotateLeft() {
      var _state$blocks$0$getRe2 = state.blocks[0].getRenderables();

      var centerX = _state$blocks$0$getRe2.x;
      var centerY = _state$blocks$0$getRe2.y;

      var newLoc = state.blocks.map(function (piece) {
        var _piece$getRenderables2 = piece.getRenderables();

        var x = _piece$getRenderables2.x;
        var y = _piece$getRenderables2.y;

        var xOffset = centerX - x;
        var yOffset = centerY - y;
        return { x: centerX - yOffset, y: centerY + xOffset };
      });
      if (callbacks.moveRequest(newLoc).isLegal) {
        setRenderables(newLoc);
      }
    },
    attach: function attach(dom) {
      state.blocks.forEach(function (piece) {
        dom.appendChild(piece.domElement);
      });
    }
  };
}

},{"../../settings.js":19,"../block.js":8}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = square;

var _shape = require('./shape.js');

var _shape2 = _interopRequireDefault(_shape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function square(x, y, color) {
  var state = {};
  var mold = [{ x: x + 1, y: y }, { x: x, y: y + 1 }, { x: x + 1, y: y + 1 }];
  return Object.assign({}, (0, _shape2.default)(state, {
    center: { x: x, y: y },
    mold: mold,
    color: color
  }));
}

},{"./shape.js":16}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = z;

var _shape = require('./shape.js');

var _shape2 = _interopRequireDefault(_shape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function z(x, y, color) {
  var state = {};
  var mold = [{ x: x, y: y - 1 }, { x: x + 1, y: y - 1 }, { x: x - 1, y: y }];
  return Object.assign({}, (0, _shape2.default)(state, {
    center: { x: x, y: y },
    mold: mold,
    color: color
  }));
}

},{"./shape.js":16}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SETTINGS = {
  height: 20,
  width: 14,
  cellSize: 25,
  colors: ['#b58900', '#cb4b16', '#dc322f', '#d33682', '#6c71c4', '#268bd2', '#2aa198', '#859900']
};

exports.default = SETTINGS;

},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setup;

var _handleKeys = require('./library/handleKeys.js');

var _handleKeys2 = _interopRequireDefault(_handleKeys);

var _game = require('./game/game.js');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setup(gameLoop) {
  console.log('deploy test 4');
  var handler = (0, _handleKeys2.default)();
  var newGame = (0, _game2.default)(handler.setNewActiveShape);

  document.onkeydown = handler.listener;
  gameLoop(newGame);
}

},{"./game/game.js":4,"./library/handleKeys.js":9}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = random;
function random(obj) {
  var keys = Object.keys(obj);
  var num = Math.round(Math.random() * (keys.length - 1));
  return obj[keys[num]];
}

},{}]},{},[1]);
