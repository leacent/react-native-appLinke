var request = require('../utils/superagent');
var CONSTANT = require('../constant');
var objectPath = require('object-path');
var brokerAdaptor = require('../entity/broker');
var muder = require('../utils/muder');
var nprogress = require('../utils/nprogress');

module.exports = {
  getDefaultBroker: function() {
    var self = this;
    nprogress.start();
    request
      .post('/Product/GetDefaultBroke')
      .send({})
      .end(function(err, res) {
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.DEFAULT_BROKER_ERROR, '网络异常');
        }
        if (res.body.success === true) {
          self.dispatch(CONSTANT.DEFAULT_BROKER_SUCCESS, _.assign(muder(
            res.body.data, brokerAdaptor.broker), {
            isDefault: true
          }));
        } else {
          self.dispatch(CONSTANT.DEFAULT_BROKER_ERROR, res.body.message ||
            '获取默认经纪人失败');
        }
      });
  },
  getBrokerList: function(options) {
    var self = this;
    options = _.defaults({
      userKey: '',
      pageSize: 10,
      pageIndex: 1
    }, options);
    nprogress.start();
    request
      .post('/Product/GetBrokeList')
      .send({
        userKey: options.userKey,
        pageSize: options.pageSize,
        pageIndex: options.pageIndex
      })
      .end(function(err, res) {
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.BROKER_LIST_ERROR, '网络异常');
        }
        if (res.body.status === 'true') {
          var brokerList = res.body.modelList || [];
          brokerList = _.map(brokerList, function(broker) {
            return muder(broker, brokerAdaptor.brokerInList);
          });
          return self.dispatch(CONSTANT.BROKER_LIST_SUCCESS, {
            list: brokerList,
            count: res.body.totalcount || 0
          });
        }
        return self.dispatch(CONSTANT.BROKER_LIST_ERROR, res.body.msg ||
          '获取经纪人列表失败');
      });
  },
  getRankList: function(rankType) {
    var self = this;
    nprogress.start();
    request
      .post('/Order/GetBrokerRank')
      .send({
        userKey: '',
        rankType: rankType
      })
      .end(function(err, res) {
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.BROKER_RANK_LIST_ERROR, '网络错误');
        }
        if (res.body.success === true) {
          return self.dispatch(CONSTANT.BROKER_RANK_LIST_SUCCESS, {
            rankType: rankType,
            brokers: _.map(_.get(res.body.data, 'brokers'), function(broker) {
              var result = muder(broker, brokerAdaptor.brokerInRankList);
              if (rankType === CONSTANT.BROKER_RANK_BY_TOTAL) {
                delete result.recommend.dealPersonCount;
              } else {
                delete result.recommend.total;
              }
              return result;
            })
          });
        }
      });
  }
};
