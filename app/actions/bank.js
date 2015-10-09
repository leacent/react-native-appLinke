var request = require('../utils/superagent');
var CONSTANT = require('../constant/');
var objectPath = require('object-path');
var muder = require('../utils/muder');
var bankAdaptor = require('../entity/bank');
var nprogress = require('../utils/nprogress');

module.exports = {
  getList: function () {
    var self = this;
    nprogress.start();
    request
      .post('/Member/GetBankList')
      .send({
        bankName: ''
      })
      .end(function (err, res) {
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.BANK_GET_LIST_ERROR, '网络错误');
        }
        if (res.body.success) {
          return self.dispatch(CONSTANT.BANK_GET_LIST_SUCCESS, _.map(res.body.data, function (bank) {
            return muder(bank, bankAdaptor.bankList);
          }));
        }
        self.dispatch(CONSTANT.BANK_GET_LIST_ERROR, res.body.message || '获取银行列表失败');
      });
  }
};
