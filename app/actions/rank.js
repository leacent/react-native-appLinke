var request = require('../utils/superagent');
var CONSTANT = require('../constant/');
var objectPath = require('object-path');
var muder = require('../utils/muder');
var brokerAdaptor = require('../entity/broker');
var nprogress = require('../utils/nprogress');

module.exports = {
  getList: function () {
    var self = this;
    nprogress.start();
    request
      .post('/Order/GetBrokerRank')
      .send({
        userKey: '',
        rankType: 0
      })
      .end(function (err, res) {
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.RANK_GET_LIST_ERROR, '网络错误');
        }
        if (res.body.success === true) {
          return self.dispatch(CONSTANT.RANK_GET_LIST_SUCCESS, _.map(res.body.data, function (bank) {
            return muder(bank, bankAdaptor.bankList);
          }));
        }
      });
  }
};
