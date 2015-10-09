var Fluxxor = require('fluxxor');
var CONSTANT = require('../constant');
var _ = require('lodash');
var Backbone = require('backbone');

module.exports = Fluxxor.createStore({
  initialize: function () {
    this.cards = new Backbone.Collection();
    this.cards.comparator = function(card) {
      return !card.get('isforWithdraw');
    };
    this.initStatus();

    this.bindActions(
      CONSTANT.CARD_ADD_START, this.onAddStart,
      CONSTANT.CARD_ADD_SUCCESS, this.onAddSuccess,
      CONSTANT.CARD_ADD_ERROR, this.onAddError,

      CONSTANT.CARD_DELETE_SUCCESS, this.onDeleteSuccess,
      CONSTANT.CARD_LIST_SUCCESS, this.onListSuccess,
      CONSTANT.CARD_GET_WITHDRAW_SUCCESS, this.onGetWithdrawSuccess,
      CONSTANT.CARD_SET_WITHDRAW_SUCCESS, this.onSetWithdrawSuccess,
      CONSTANT.ME_LOGOUT_SUCCESS, this.onLogOutSuccess
    );
  },
  initStatus: function () {
    this.isFetchWithdraw = false;
    this.isFetchList = false;
    this.cardAddStatus = {desc:null, card:{}, tip: ''};
  },
  onLogOutSuccess: function () {
    this.cards.reset();
    this.initStatus();
  },
  onAddSuccess: function (card) {
    if (this.cards.length === 0) {
      card.isforWithdraw = true;
    }
    this.cards.add(card, {merge:true});
    this.cardAddStatus.desc = 'success';
    this.cardAddStatus.card = card;
    this.emit('change');
  },
  onAddStart: function () {
    this.cardAddStatus.desc = 'start';
    this.emit('change');
  },
  onAddError: function (msg) {
    this.cardAddStatus.desc = 'error';
    this.cardAddStatus.tip = msg;
    this.emit('change');
  },
  onDeleteSuccess: function (id) {
    this.cards.remove(id);
    this.emit('change');
  },
  onListSuccess: function (cards) {
    this.isFetchList = true;
    this.cards.add(cards, {merge:true});
    this.emit('change');
  },
  onSetWithdrawSuccess: function (id) {
    this.cards.at(0).set('isforWithdraw',false);
    this.cards.get(id).set('isforWithdraw',true);
    this.cards.sort();
    this.emit('change');
  },
  onGetWithdrawSuccess: function (wrap) {
    var card = wrap.card;
    this.isFetchWithdraw = true;
    if (_.isEmpty(card)) return;
    this.cards.add(card, {merge:true});
    this.emit('change');
  },
  getList: function () {
    return this.cards.models;
  },
  getWithdraw: function () {
    return _.get(this.cards.at(0), 'attributes');
  },
  hasFetchWithdraw: function () {
    return this.isFetchWithdraw;
  },
  hasFetchCardList: function () {
    return this.isFetchList;
  },
  getCardAddStatus: function () {
    return this.cardAddStatus;
  }

});
