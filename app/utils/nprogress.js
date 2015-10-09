var nprogress = require('nprogress');

var stack = 0;

module.exports = {
  start: function () {
    if (!stack) {
      nprogress.start();
    }
    stack++;
  },
  done: function () {
    if (stack) {
      stack--;
    }
    if (!stack) {
      nprogress.done();
    }
  }
};
