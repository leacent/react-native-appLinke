var createBorrow = require('./createBorrow');
var createRecommend = require('./createRecommend');
var borrowlist = require('./borrowlist');
var recommendList = require('./recommendList');

var order = require('./getOrderById');

module.exports = {
  'POST /Order/BorrowMoney': function (req, res) {
    return res.json(createBorrow);
  },
  'POST /Order/RecommendLoan': function (req, res) {
    return res.json(createRecommend);
  },
  'POST /Member/GetMyLoan': function (req, res) {
    return res.json(borrowlist);
  },
  'POST /Order/GetOrderByID': function (req, res) {
    return res.json(order);
  },
  'POST /Order/GetPersonalRecommend': function (req, res) {
    return res.json(recommendList);
  }
};
