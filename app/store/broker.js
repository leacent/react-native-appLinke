var Fluxxor = require('fluxxor');
var CONSTANT = require('../constant');
var _ = require('lodash');
var Backbone = require('backbone');
var trimList = require('../utils/functions').trimList;

module.exports = Fluxxor.createStore({
  initialize: function () {
    this.defaultBroker = {};
    this.brokers = new Backbone.Collection();
    this.hasRankToal = false;
    this.hasRankDealPersonCount = false;
    this.bindActions(
      CONSTANT.DEFAULT_BROKER_SUCCESS, this.onDefaultBrokerSuccess,
      CONSTANT.DEFAULT_BROKER_ERROR, this.onDefaultBrokerError,
      CONSTANT.BROKER_LIST_SUCCESS, this.onBrokerListSuccess,
      CONSTANT.BROKER_RANK_LIST_SUCCESS, this.onRankListSuccess
    );
  },
  onDefaultBrokerSuccess: function (broker) {
    this.defaultBroker = broker;
    this.emit('change');
  },
  onBrokerListSuccess: function (brokerListObj) {
    var output = this.brokers.add(brokerListObj.list);
    this.brokersCount = brokerListObj.count;
    this.brokers = _.uniq(output, function (broker) {
      return broker.id;
    });
    this.emit('change');
  },
  onRankListSuccess: function (wraper) {
    var brokers = wraper.brokers, rankType = wraper.rankType, self = this;
    if (rankType === CONSTANT.BROKER_RANK_BY_TOTAL) {
      this.hasRankToal = true;
    } else {
      this.hasRankDealPersonCount = true;
    }
    _.forEach(brokers, function (broker) {
      var existBroker = self.brokers.get(broker.id);
      if (existBroker) {
        self.brokers.add(_.merge(existBroker.attributes,broker),{merge:true});
      } else {
        self.brokers.add(broker);
      }
    });
    // this.brokers.add(_.merge(this.brokers,trimList(brokers)), {merge: true});
    this.emit('change');
  },
  onDefaultBrokerError: function () {

  },
  getDefaultBroker: function () {
    return this.defaultBroker;
  },
  getBrokerList: function () {
    return this.brokers.models;
  },
  hasGetBrokersRankByTotal: function () {
    return this.hasRankToal;
  },
  hasGetBrokersRankByPerson: function () {
    return this.hasRankDealPersonCount;
  }
});
