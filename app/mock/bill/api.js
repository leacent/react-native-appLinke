var billList = require('./bill');
var add = require('./add');
var fee = require('./fee');

module.exports = {
  'POST /Member/GetWithdrawApplicationlist': function (req, res) {
    return res.json(billList.list);
  },
  'POST /Member/InsertWithdrawApplication': function (req, res) {
    return res.json(add.success);
  },
  'POST /Member/IsCurrMonthFirstWithdraw': function (req, res) {
    return res.json(fee.getFee);
  }
};
