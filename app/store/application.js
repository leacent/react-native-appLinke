var Fluxxor = require('fluxxor');
var _ = require('lodash');

var CONSTANT = require('../constant');

var ApplicationStore = Fluxxor.createStore({
  initialize: function () {
    this._setNavbar();
    this._setTip();
    this.bindActions(
      CONSTANT.APPLICATION_NAVBAR_SET, 'onNavbarSet',
      CONSTANT.APPLICATION_TIP_SET, 'onTipSet'

    );
  },
  _setNavbar: function (options) {
    options = _.assign({
      type: CONSTANT.APPLICATION_NAVBAR_TYPE_IS_MENU,
      title: '连客经纪人'
    }, options);
    this._navbar = options;
  },
  _setTip: function (options) {
    this._tip = _.assign({
      visible: false,
      text: ''
    },options);
  },
  onNavbarSet: function (options) {
    this._setNavbar(options);
    this.emit('change');
  },
  onTipSet: function (msg) {
    this._setTip({
      visible: !!msg,
      text: msg
    });
    if (msg) {
      setTimeout(()=>this.onTipSet(),1000);
    }
    this.emit('change');
  },

  getNavbar: function () {
    return this._navbar;
  },
  getTip: function () {
    return this._tip;
  }
});

module.exports = ApplicationStore;
