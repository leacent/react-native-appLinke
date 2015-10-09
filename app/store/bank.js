var Fluxxor = require('fluxxor');
var CONSTANT = require('../constant');
var _ = require('lodash');
var Backbone = require('backbone');

module.exports = Fluxxor.createStore({
  initialize: function () {
    this.banks = new Backbone.Collection();
    this.bindActions(
      CONSTANT.BANK_GET_LIST_SUCCESS, this.onBankListSuccess,
      CONSTANT.BANK_GET_LIST_ERROR, this.onBankListError,
      CONSTANT.ME_LOGOUT_SUCCESS, this.onLogOutSuccess
    );
  },
  onBankListSuccess: function (bankList) {
    this.banks.add(bankList);
    this.emit('change');
  },
  onBankListError: function () {

  },
  onLogOutSuccess: function () {
    this.banks.reset();
    this.emit('change');
  },
  getList: function () {
    return this.banks.models;
  }
});
