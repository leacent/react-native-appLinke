var Fluxxor = require('fluxxor');
var CONSTANT = require('../constant');
var _ = require('lodash');
var Backbone = require('backbone');

module.exports = Fluxxor.createStore({
  initialize: function () {
    this.bills = new Backbone.Collection();
    this.bills.comparator = function (bill) {
      return -bill.get('createAt');
    };
    this.preBill = new Backbone.Model();
    this.initStatus();
    this.bindActions(
      CONSTANT.BILL_LIST_SUCCESS, this.onBillListSuccess,
      CONSTANT.BILL_CREATE_PRE, this.onCreatePreBill,
      CONSTANT.BILL_GET_FEE_SUCCESS, this.onGetFee,
      CONSTANT.BILL_GET_FEE_ERROR, this.onGetFeeError,
      CONSTANT.BILL_CREATE_START, this.onCreateStart,
      CONSTANT.BILL_CREATE_SUCCESS, this.onCreateSuccess,
      CONSTANT.ME_LOGOUT_SUCCESS, this.onLogOutSuccess
    );
  },
  initStatus: function () {
    this.fee = 0;
    this.isFetchList = false;
    this.createBillStatus = {
      desc: null,
      tip: ''
    };
  },
  onLogOutSuccess: function () {
    this.bills.reset();
    this.preBill.clear();
    this.initStatus();
  },
  onBillListSuccess: function (list) {
    this.bills.add(list, {merge:true});
    this.isFetchList = true;
    this.emit('change');
  },
  onCreatePreBill: function (bill) {
    this.preBill.clear();
    this.preBill.set(bill);
    this.emit('change');
  },
  onGetFee: function (fee) {
    this.fee = fee;
    this.emit('change');
  },
  onGetFeeError: function (msg) {
    var self = this;
    this.fee = msg;
    this.emit('change');
    setTimeout(function () {
      this.fee = 0;
    },100);
  },
  onCreateSuccess: function (bill) {
    this.fee = 0;
    // this.preBill.set('id',billId);
    this.bills.add(bill);
    // this.preBill.clear();
    this.createBillStatus.desc = 'success';
    this.emit('change');
  },
  onCreateStart: function () {
    this.createBillStatus.desc = 'start';
    this.emit('change');
  },
  getBillList: function () {
    return this.bills.models;
  },
  hasFetchList: function () {
    return this.isFetchList;
  },
  getPreBill: function () {
    return this.preBill.attributes || {};
  },
  getFee: function () {
    return this.fee;
  },
  getCreateBillStatus: function () {
    return this.createBillStatus;
  }
});
