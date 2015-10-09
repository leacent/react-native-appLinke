var _ = require('lodash');
var km = require('keymirror');

module.exports = _.assign({

  // ghost number :
  INCOME_FROM_GROUP: 303,   //团队奖励
  INCOME_FROM_SINGUP: 201,   //注册奖励
  INCOME_FROM_DEAL: 301,   //返点奖励
  INCOME_FROM_RECOMMEND: 202,   //推荐奖励
  INCOME_FROM_PAYMENT: 302,   //提成奖励
  INCOME_FROM_FEE: 304 //代收手续费

}, km({

  // dispatcher :

  INCOME_GET_SUCCESS: null,
  INCOME_GET_ERROR: null,

  INCOME_LIST_BYMONTH_SUCCESS: null,
  INCOME_LIST_BYMONTH_ERROR: null,

  INCOME_LIST_SUCCESS: null,
  INCOME_LIST_ERROR: null
}));
