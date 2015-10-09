var _ = require('lodash');
var km = require('keymirror');

module.exports = _.assign({

  // ghost number :

}, km({

  // dispatcher :

  ME_GET_SUCCESS: null,
  ME_GET_ERROR: null,
  ME_GET_DETAIL_SUCCESS: null,
  ME_GET_DETAIL_ERROR: null,

  ME_GET_RECOMMEND_SUCCESS: null,
  ME_GET_RECOMMEND_ERROR: null,

  ME_LOGIN_SUCCESS: null,
  ME_LOGIN_ERROR: null,
  ME_LOGIN_START: null,

  ME_SIGNUP_START: null,
  ME_SIGNUP_ERROR: null,
  ME_SIGNUP_SUCCESS: null,

  ME_AUTH_START: null,
  ME_AUTH_ERROR: null,
  ME_AUTH_SUCCESS: null,

  ME_LOGOUT_SUCCESS: null,
  ME_LOGOUT_ERROR: null,

  ME_UPDATE_PHONE_SUCCESS: null,
  ME_UPDATE_PHONE_ERROR: null,
  ME_UPDATE_INFO_SUCCESS: null
}));
