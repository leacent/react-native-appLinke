var CONSTANT = require('../constant');

module.exports = {
  setNavbar: function (options) {
    this.dispatch(CONSTANT.APPLICATION_NAVBAR_SET, options);
  },
  setTip: function (msg) {
    this.dispatch(CONSTANT.APPLICATION_TIP_SET, msg);
  },
};
