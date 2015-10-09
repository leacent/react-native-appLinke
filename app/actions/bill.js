var request = require('../utils/superagent');
var billAdaptor = require('../entity/bill');
var nprogress = require('../utils/nprogress');
var CONSTANT = require('../constant');
var muder = require('../utils/muder');

module.exports = {
  getList: function () {
    var self = this;
    nprogress.start();
    request
      .post('/Finance/GetWithdrawApplicationlist')
      .send({
      })
      .end(function(err, res){
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.BILL_LIST_ERROR, '网络错误');
        }
        if (res.body.success === true) {
          return self.dispatch(CONSTANT.BILL_LIST_SUCCESS, _.map((res.body.data.data2||[]).concat(res.body.data.data1||[]), function (bill) {
            return muder(bill, billAdaptor.list);
          }));
        }
        return  self.dispatch(CONSTANT.BILL_LIST_ERROR, res.body.message || '获取对账单失败');
      });
  },
  createPreBill: function (bill) {
    this.dispatch(CONSTANT.BILL_CREATE_PRE, bill);
  },
  addBill: function (bill) {
    var self = this;
    nprogress.start();
    self.dispatch(CONSTANT.BILL_CREATE_START);
    request
      .post('/Finance/InsertWithdrawApplication')
      .send({
        money: bill.amount,
        bankCode: bill.card.id
      })
      .end(function(err, res){
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.BILL_CREATE_ERROR, '网络错误');
        }
        if (res.body.success) {
          bill.id = res.body.data;
          return self.dispatch(CONSTANT.BILL_CREATE_SUCCESS, bill);
        }
        return  self.dispatch(CONSTANT.BILL_CREATE_ERROR, res.body.message || '获取对账单失败');
      });
  },
  getFee: function (amount) {
    var self = this;
    nprogress.start();
    request
      .post('/Finance/IsCurrMonthFirstWithdraw')
      .send({
        money: amount
      })
      .end(function(err, res){
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.BILL_GET_FEE_ERROR, '网络错误');
        }
        if (res.body.success) {
          return self.dispatch(CONSTANT.BILL_GET_FEE_SUCCESS, res.body.data);
        }
        return  self.dispatch(CONSTANT.BILL_GET_FEE_ERROR, res.body.message || '获取手续费失败');
      });
  }
};
