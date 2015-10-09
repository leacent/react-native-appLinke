var _ = require('lodash');
var km = require('keymirror');

module.exports = _.assign({

  // ghost number :

}, km({

  // dispatcher :

  CARD_LIST_SUCCESS: null,
  CARD_LIST_ERROR: null,

  CARD_GET_WITHDRAW_SUCCESS: null,
  CARD_GET_WITHDRAW_ERROR: null,

  CARD_SET_WITHDRAW_SUCCESS: null,
  CARD_SET_WITHDRAW_ERROR: null,

  CARD_ADD_START: null,
  CARD_ADD_SUCCESS: null,
  CARD_ADD_ERROR: null,

  CARD_DELETE_SUCCESS: null,
  CARD_DELETE_ERROR: null
}));
