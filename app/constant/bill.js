var _ = require('lodash');
var km = require('keymirror');

module.exports = _.assign({

  // ghost number :
  BILL_WITHDRAW_SUCCESS: 2,
  BILL_WITHDRAW_ERROR: 1,
  BILL_WITHDRAW_DOING: 0

}, km({

  // dispatcher :

  BILL_LIST_SUCCESS: null,
  BILL_LIST_ERROR: null,

  BILL_CREATE_PRE: null,
  BILL_GET_FEE_ERROR: null,
  BILL_GET_FEE_SUCCESS: null,

  BILL_CREATE_START: null,
  BILL_CREATE_SUCCESS: null,
  BILL_CREATE_ERROR: null

}));
