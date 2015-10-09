var _ = require('lodash');
var km = require('keymirror');

module.exports = _.assign({

  // ghost number :
  ORDER_APPLY: 1,  // 交单状态码
  ORDER_FOLLOW: 2, // 顾问跟进中状态吗
  ORDER_ACCEPT: 3,  // 放款成功状态码
  ORDER_REPAYING: 4,  // 还款中
  ORDER_END: 5,    // 已结清还款
  ORDER_CANCEL: 6    // 已取消
}, km({

  // dispatcher :

  ORDER_CREATE_BORROW_SUCCESS: null,

  ORDER_CREATE_RECOMMEND_START: null,
  ORDER_CREATE_RECOMMEND_SUCCESS: null,
  ORDER_CREATE_RECOMMEND_ERROR: null,

  ORDER_GET_SUCCESS: null,
  ORDER_GET_ERROR: null,
  ORDER_BORROWING_LIST_SUCCESS: null,
  ORDER_BORROWING_LIST_ERROR: null,
  ORDER_RECOMMEND_LIST_SUCCESS: null,
  ORDER_RECOMMEND_LIST_ERROR: null
}));
