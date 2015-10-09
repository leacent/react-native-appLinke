var Fluxxor = require('fluxxor');
var CONSTANT = require('../constant');
var _ = require('lodash');
var Backbone = require('backbone');

module.exports = Fluxxor.createStore({
  initialize: function () {
    this.rank = new Backbone.Collection();
    this.bindActions(
      CONSTANT.RANK_GET_LIST_SUCCESS, this.onRankListSuccess,
      CONSTANT.RANK_GET_LIST_ERROR, this.onRankListError
    );
  },
  onRankListSuccess: function (rankList) {
    this.rank.add(rankList);
    this.emit('change');
  },
  onRankListError: function () {

  },
  getList: function () {
    return this.rank.models;
  }
});
