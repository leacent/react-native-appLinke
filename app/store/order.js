var Fluxxor = require('fluxxor');
var CONSTANT = require('../constant');
var _ = require('lodash');
var backbone = require('backbone');

module.exports = Fluxxor.createStore({
  initialize: function () {
    this.initBorrowingOrder();
    this.initRecommendOrder();
    this.bindActions(
      CONSTANT.ORDER_CREATE_BORROW_SUCCESS, this.createBorrowOrderSuccess,
      CONSTANT.ORDER_CREATE_RECOMMEND_START, this.createRecommendOrderStart,
      CONSTANT.ORDER_CREATE_RECOMMEND_ERROR, this.createRecommendOrderError,
      CONSTANT.ORDER_CREATE_RECOMMEND_SUCCESS, this.createRecommendOrderSuccess,
      CONSTANT.ORDER_GET_SUCCESS, this.onGetOrderSuccess,
      CONSTANT.ORDER_BORROWING_LIST_SUCCESS, this.onOrderBorrowingListSuccess,
      CONSTANT.ORDER_RECOMMEND_LIST_SUCCESS, this.onOrderRecommendListSuccess,
      CONSTANT.ME_LOGOUT_SUCCESS, this.onLogOutSuccess
    );
  },
  initBorrowingOrder: function () {
    this.borrowingOrder = new Backbone.Collection();
    this.borrowingOrder.comparator = function (order) {
      return -order.attributes.createAt;
    };
    this.isFetchBorrowing = false;
  },
  initRecommendOrder: function () {
    this.recommendOrder = new Backbone.Collection();
    this.recommendOrder.comparator = function (order) {
      return -order.get('createAt');
    };
    this.isFetchRecommend = false;
    this.createRecommendStatus = {
      desc: null,
      tip: '',
      order: {}
    };
  },
  createBorrowOrderSuccess: function (borrowingOrder) {
    this.borrowingOrder.add(borrowingOrder, {merge: true});
    this.emit('change');
  },
  createRecommendOrderSuccess: function (recommendOrder) {
    this.recommendOrder.add(recommendOrder, {merge: true});
    this.createRecommendStatus.desc = 'success';
    this.createRecommendStatus.order = recommendOrder;
    this.emit('change');
  },
  createRecommendOrderStart:function () {
    this.createRecommendStatus.desc = 'start';
    this.emit('change');
  },
  createRecommendOrderError: function (msg) {
    this.createRecommendStatus.desc = 'error';
    this.createRecommendStatus.tip = msg || '';
    this.emit('change');
  },
  onOrderBorrowingListSuccess: function (orderList) {
    this.isFetchBorrowing = true;
    this.borrowingOrder.add(orderList, {merge: true});
    this.emit('change');
  },
  onOrderRecommendListSuccess: function (list) {
    this.isFetchRecommend = true;
    this.recommendOrder.add(list, {merge: true});
    this.emit('change');
  },
  onGetOrderSuccess: function (orderWrap) {
    if (orderWrap.type === 'borrowing') {
      this.borrowingOrder.add(orderWrap.order, {merge: true});
    } else if (orderWrap.type === 'recommend') {
      this.recommendOrder.add(orderWrap.order, {merge: true});
    }
    this.emit('change');
  },
  onLogOutSuccess: function () {
    this.recommendOrder.reset();
    this.isFetchRecommend = false;
    this.createRecommendStatus = {
      desc: null,
      tip: '',
      order: {}
    };
    this.emit('change');
  },
  getOrder: function (id, type) {
    var orderList = type === 'borrowing' ? this.borrowingOrder : this.recommendOrder;
    var orderModel = orderList.get(id);
    return orderModel ? orderModel.attributes : {};
  },
  getBorrowList: function () {
    return this.borrowingOrder.models;
  },
  getRecommendList: function () {
    return this.recommendOrder.models;
  },
  hasFetchBorrowing: function () {
    return this.isFetchBorrowing;
  },
  hasFetchRecommend: function () {
    return this.isFetchRecommend;
  },
  getCreateRecommendStatus: function () {
    return this.createRecommendStatus;
  }
});
