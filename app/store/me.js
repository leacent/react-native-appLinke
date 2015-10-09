var Fluxxor = require('fluxxor');
var CONSTANT = require('../constant');
var _ = require('lodash');
var Model = require('backbone-model').Model;
var trimList = require('../utils/functions').trimList;
// var cookie = require('component-cookie');
var toNum = require('../utils/functions').toNum;
module.exports  = Fluxxor.createStore({
  initialize: function () {
    this.me = new Model();
    this.initStatus();
    this.bindActions(
      CONSTANT.ME_GET_SUCCESS, 'onGetSuccess',
      CONSTANT.ME_GET_ERROR, 'onGetError',
      CONSTANT.ME_GET_DETAIL_SUCCESS, 'onGetDetailSuccess',
      CONSTANT.ME_GET_DETAIL_ERROR, 'onGetDetailError',
      CONSTANT.ME_GET_RECOMMEND_SUCCESS, 'onGetRecommendSuccess',
      CONSTANT.ME_GET_RECOMMEND_ERROR, 'onGetRecommendError',
      CONSTANT.ME_LOGIN_START, 'onLoginStart',
      CONSTANT.ME_LOGIN_ERROR, 'onLoginError',
      CONSTANT.ME_LOGIN_SUCCESS, 'onLoginSuccess',
      CONSTANT.ME_LOGOUT_ERROR, 'onLogOutError',
      CONSTANT.ME_LOGOUT_SUCCESS, 'onLogOutSuccess',
      CONSTANT.ME_SIGNUP_START, 'onSignupStart',
      CONSTANT.ME_SIGNUP_ERROR, 'onSignupError',
      CONSTANT.ME_SIGNUP_SUCCESS, 'onSignupSuccess',
      CONSTANT.ME_AUTH_SUCCESS, 'onAuthSuccess',
      CONSTANT.ME_UPDATE_PHONE_SUCCESS, 'onUpdatePhoneSuccess',
      CONSTANT.ME_UPDATE_INFO_SUCCESS, 'onUpdateInfoSuccess',
      CONSTANT.BILL_CREATE_SUCCESS, 'onWithdrawSuccess',
      CONSTANT.CARD_ADD_SUCCESS, 'onAddCardSuccess'
    );
  },
  initStatus: function () {
    this.loginStatus = {
      desc: null,
      tip: ''
    };
    this.signupStatus = {
      desc: null,
      tip: ''
    };
    this.hasGetDetail = false;
  },
  onGetSuccess: function (basicInfo) {
    this.me.set(trimList(basicInfo));
    this.emit('change');
  },
  onGetDetailSuccess: function (detail) {
    this.me.set(trimList(detail));
    if (detail.name && detail.identityId) {
      this.me.set('isAuth',true);
    }
    this.hasGetDetail = true;
    this.emit('change');
  },
  onGetRecommendSuccess: function (recommend) {
    this.me.set('recommend', recommend);
    this.emit('change');
  },
  onLoginSuccess: function (wrap) {
    var self = this;
    // if (wrap.isRemember) {
    //   cookie('token', wrap.token,{maxage: 24*60*60*7, path:'/'});
    //   cookie('time', wrap.timestamp,{maxage: 24*60*60*7, path:'/'});
    //   cookie('user', wrap.phone,{maxage: 24*60*60*7, path:'/'});
    // } else {
    //   cookie('token', wrap.token,{path:'/'});
    //   cookie('time', wrap.timestamp,{path:'/'});
    //   cookie('user', wrap.phone,{path:'/'});
    // }
    this.loginStatus.desc = 'success';
    this.emit('change');
    setTimeout(function () {
      self.loginStatus.desc = null;
    }, 500);
  },
  onSignupSuccess: function (wrap) {
    var self = this;
    cookie('token', wrap.token,{path:'/'});
    cookie('time', wrap.timestamp,{path:'/'});
    cookie('user', wrap.phone,{path:'/'});

    this.signupStatus.desc = 'success';
    this.emit('change');
    setTimeout(function () {
      self.signupStatus.desc = null;
    }, 1000);
  },
  onLogOutSuccess: function () {
    cookie('token',null, {path:'/'});
    cookie('time', null,{path:'/'});
    cookie('user', null,{path:'/'});
    this.me.clear();
    this.initStatus();
    this.emit('change');
  },
  onLoginStart: function () {
    this.loginStatus.desc = 'start';
    this.emit('change');
  },
  onLoginError: function (msg) {
    this.loginStatus = {
      desc: 'error',
      tip: msg
    };
    this.emit('change');
    this.loginStatus.desc = null;
  },
  onSignupStart: function () {
    this.signupStatus.desc = 'start';
    this.emit('change');
  },
  onSignupError: function (msg) {
    this.signupStatus = {
      desc: 'error',
      tip: msg
    };
    this.emit('change');
    this.signupStatus.desc = null;
  },
  onUpdatePhoneSuccess: function (phone) {
    this.me.set('phone',phone);
    this.emit('change');
  },
  onGetError: function () {

  },
  onAddCardSuccess: function () {
    this.me.set('isAuth',true);
    this.emit('change');
  },
  onAuthSuccess: function (opt) {
    this.me.set('isAuth',true);
    this.me.set('name',opt.name);
    this.me.set('identityId',opt.identityId);
    this.emit('change');
  },
  onUpdateInfoSuccess: function (me) {
    this.me.set(me);
    this.emit('change');
  },
  onWithdrawSuccess: function (bill) {
    var fund = this.me.get('fund');
    console.log(fund);
    fund.balance = toNum(fund.balance) - bill.fee - bill.amount;
    fund.withdrawDoing += bill.amount;
    this.me.set('fund', fund);
    this.emit('change');
  },
  // onGetWithdrawSuccess: function (wrap) {
  //   var found = wrap.found;
  //   found = _.assign(this.me.get('found') || {}, trimList(found));
  //   this.me.set('found', found);
  //   this.emit('change');
  // },
  // onPromotionCodeSuccess: function (code) {
  //   this.me.set('promotionCode',code);
  //   this.emit('change');
  // },
  getUserRecommend: function () {
    return this.me.get('recommend') || {};
  },
  getFound: function () {
    return this.me.get('fund') || {};
  },
  getLoginStatus: function () {
    return this.loginStatus;
  },
  getSignupStatus: function () {
    return this.signupStatus;
  },
  isAuth: function () {
    return this.me.get('isAuth');
  },
  getMe: function () {
    return this.me.attributes;
  },
  hasFetchDetail: function () {
    return this.hasGetDetail;
  }
  // getPromotionCode: function () {
  //   return this.me.get('promotionCode');
  // }
});
