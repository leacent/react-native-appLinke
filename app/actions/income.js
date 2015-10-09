var request = require('../utils/superagent');
var CONSTANT = require('../constant');
var objectPath = require('object-path');
var muder = require('../utils/muder');
var incomeAdaptor = require('../entity/income');
var nprogress = require('../utils/nprogress');

module.exports = {
  getList: function () {
    var self = this;
    nprogress.start();
    request
      .post('/Finance/GetPersonalBrokerages')
      .send({
      })
      .end(function (err, res) {
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.INCOME_LIST_ERROR, '网络错误');
        }
        if (res.body.success === true) {
          return self.dispatch(CONSTANT.INCOME_LIST_SUCCESS, _.map(res.body.data, function (income) {
            return muder(income, incomeAdaptor.list);
          }));
        }
      });
  },
  getByMonth: function (monthId) {
    var self = this;
    nprogress.start();
    request
      .post('/Finance/GetPersonalBrokerageDetailsByBrokerageID')
      .send({
        brokerageID: monthId
      })
      .end(function (err, res) {
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.INCOME_LIST_BYMONTH_ERROR, '网络错误');
        }
        if (res.body.success === true) {
          return self.dispatch(CONSTANT.INCOME_LIST_BYMONTH_SUCCESS, {
            id: monthId,
            incomes: _.map(res.body.data, function (income) {
              return muder(income, incomeAdaptor.income);
            })
          });
        }
      });
  },
  getIncome: function (id) {
    var self = this;
    nprogress.start();
    request
      .post('/Finance/GetBrokerageDetailInfoByID')
      .send({
        brokerageDetailID: id
      })
      .end(function (err, res) {
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.INCOME_GET_ERROR, '网络错误');
        }
        if (res.body.success === true) {
          return self.dispatch(CONSTANT.INCOME_GET_SUCCESS, muder(res.body.data, incomeAdaptor.income));
        }
      });
  }
};
