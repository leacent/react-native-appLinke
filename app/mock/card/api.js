var add_delete = require('./add-delete');
var list = require('./list');
var withdraw = require('./withdraw');

module.exports = {
  'POST /Member/InsertBank': function (req, res) {
    return res.json(add_delete.add);
  },
  'POST /Member/DeleteBank': function (req, res) {
    return res.json(add_delete.delete);
  },
  'POST /Member/GetUserBankList': function (req, res) {
    return res.json(list.list);
  },
  'POST /Member/GetWithdrawalsData': function (req, res) {
    return res.json(withdraw.get);
  },
  'POST /Member/UpdateBank': function (req, res) {
    return res.json(withdraw.set);
  }
};
