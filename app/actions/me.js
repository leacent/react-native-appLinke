var request = require('../utils/superagent');
var meAdaptor = require('../entity/me');
// var nprogress = require('../utils/nprogress');
var CONSTANT = require('../constant');
var muder = require('../utils/muder');

module.exports = {
  // 获取基本信息包括收益总额、可提现总额
  getBasic: function () {
    var self = this;
    nprogress.start();
    request
      .post('/Account/GetPersonalInfo')
      .send({})
      .end(function (err, res) {
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.ME_GET_ERROR, '网络错误');
        }
        if (res.body.success) {
          return self.dispatch(CONSTANT.ME_GET_SUCCESS, muder(res.body.data, meAdaptor.basic));
        }
        return self.dispatch(CONSTANT.ME_GET_ERROR, res.body.message ||'获取个人信息失败');
      });
  },
  getRecommend: function () {
    var self = this;
    nprogress.start();
    request
      .post('/Order/GetPersonalRecommendSummary')
      .send({})
      .end(function (err, res) {
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.ME_GET_RECOMMEND_ERROR, '网络错误');
        }
        if (res.body.success) {
          return self.dispatch(CONSTANT.ME_GET_RECOMMEND_SUCCESS, muder(res.body.data, meAdaptor.recommend));
        }
        return self.dispatch(CONSTANT.ME_GET_RECOMMEND_ERROR, res.body.message ||'获取个人信息失败');
      });
  },
  getDetail: function () {
    var self = this;
    nprogress.start();
    request
      .post('/Account/GetPersonalDetailInfo')
      .send({})
      .end(function (err, res) {
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.ME_GET_DETAIL_ERROR, '网络错误');
        }
        if (res.body.success) {
          return self.dispatch(CONSTANT.ME_GET_DETAIL_SUCCESS, muder(res.body.data, meAdaptor.detail));
        }
        return self.dispatch(CONSTANT.ME_GET_DETAIL_ERROR, res.body.message ||'获取个人信息详情失败');
      });
  },
  login: function (opts) {
    var self = this;
    // nprogress.start();
    var now = +new Date();
    self.dispatch(CONSTANT.ME_LOGIN_START);
    request
      .post('/Account/Login')
      .send({
        loginName: opts.phone,
        pwd: opts.pwd,
        timeStamp: now
      })
      .end(function (err, res) {
        // nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.ME_LOGIN_ERROR, '网络错误');
        }
        if (res.body.success) {
          return self.dispatch(CONSTANT.ME_LOGIN_SUCCESS, {
            token: res.body.data.token,
            isRemember: opts.isRemember,
            timestamp: now,
            phone: opts.phone
          });
        }
        return self.dispatch(CONSTANT.ME_LOGIN_ERROR, res.body.message ||'登录失败');
      });
  },
  signup: function (opts) {
    var self = this;
    var now = +new Date();
    nprogress.start();
    self.dispatch(CONSTANT.ME_SIGNUP_START);
    request
      .post('/Register/SimpleRegister')
      .send({
        phone: opts.phone,
        password: opts.pwd,
        timeStamp: now
      })
      .end(function (err, res) {
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.ME_SIGNUP_ERROR, '网络错误');
        }
        if (res.body.success) {
          return self.dispatch(CONSTANT.ME_SIGNUP_SUCCESS, {
            token: res.body.data.token,
            timestamp: now,
            phone: opts.phone
          });
        }
        return self.dispatch(CONSTANT.ME_SIGNUP_ERROR, res.body.message ||'注册失败');
      });
  },
  auth: function (name, id, callback) {
    var self = this;
    nprogress.start();
    request
      .post('/Account/AuthenticateUser')
      .send({
        realName: name,
        ID: id
      })
      .end(function (err, res) {
        nprogress.done();
        if (err) {
          callback('网络错误');
          return self.dispatch(CONSTANT.ME_AUTH_ERROR, '网络错误');
        }
        if (res.body.success) {
          callback(null);
          return self.dispatch(CONSTANT.ME_AUTH_SUCCESS, {
            name: name,
            identityId: id
          });
        }
        callback(res.body.message ||'实名认证失败');
        return self.dispatch(CONSTANT.ME_AUTH_ERROR, res.body.message ||'实名认证失败');
      });
  },
  updatePhone: function (phone, callback) {
    var self = this;
    nprogress.start();
    request
      .post('/Account/UpdateUserPhone')
      .send({
        phone: phone
      })
      .end(function (err, res) {
        nprogress.done();
        if (err) {
          callback('网络错误');
          return self.dispatch(CONSTANT.ME_UPDATE_PHONE_ERROR, '网络错误');
        }
        if (res.body.success) {
          callback(null);
          return self.dispatch(CONSTANT.ME_UPDATE_PHONE_SUCCESS, phone);
        }
        callback(res.body.message ||'更新手机号失败');
        return self.dispatch(CONSTANT.ME_UPDATE_PHONE_ERROR, res.body.message ||'更新手机号失败');
      });
  },
  updatePwd: function (password, callback) {
    var self = this;
    nprogress.start();
    request
      .post('/Account/UpdateUserPassWord')
      .send({
        password: password
      })
      .end(function (err, res) {
        nprogress.done();
        if (err) {
          return callback('网络错误');
        }
        if (res.body.success) {
          callback(null);
          return;
        }
        callback(res.body.message ||'更改密码失败');
      });
  },
  forgetPwd: function (phone, password, callback) {
    var self = this;
    nprogress.start();
    request
      .post('/Account/UpdatePassword')
      .send({
        key: phone,
        password: password
      })
      .end(function (err, res) {
        nprogress.done();
        if (err) {
          return callback('网络错误');
        }
        if (res.body.success) {
          callback(null);
          return;
        }
        callback(res.body.message ||'重设密码失败');
      });
  },
  authEmail: function (email,callback) {
    var self = this;
    nprogress.start();
    request
      .post('/Account/SendEmail')
      .send({
        email: email
      })
      .end(function (err, res) {
        nprogress.done();
        if (err) {
          return callback('网络错误');
        }
        if (res.body.success) {
          callback(null);
          return self.dispatch(CONSTANT.ME_UPDATE_INFO_SUCCESS, {
            securityEamil: email
          });
        }
        callback(res.body.message ||'邮箱验证失败');
      });
  },
  updateExtra: function (me, callback) {
    var self = this;
    nprogress.start();
    request
      .post('/Account/UpdateFoundation')
      .send({
        userKey: me.phone,
        email: me.securityEamil,
        company: me.company,
        description: me.selfIntroduc
      })
      .end(function (err, res) {
        nprogress.done();
        if (err) {
          return callback('网络错误');
        }
        if (res.body.success) {
          callback(null);
          return self.dispatch(CONSTANT.ME_UPDATE_INFO_SUCCESS, me);
        }
        callback(res.body.message ||'更新信息失败');
      });
  },
  appeal: function (content, contact, callback) {
    var self = this;
    nprogress.start();
    request
      .post('/Account/AppendAppeal')
      .send({
        contact: contact,
        contents: content
      })
      .end(function (err, res) {
        nprogress.done();
        if (err) {
          return callback('网络错误');
        }
        if (res.body.success) {
          callback(null);
          return;
        }
        callback(res.body.message ||'投诉失败');
      });
  },
  // getPromotionCode: function (userKey) {
  //   var self = this;
  //   nprogress.start();
  //   request
  //     .post('/Member/GetSpreadData')
  //     .send({
  //       userKey: userKey
  //     })
  //     .end(function (err, res) {
  //       nprogress.done();
  //       if (err) {
  //         return self.dispatch(CONSTANT.ME_PROMOTION_CODE_ERROR, '网络错误');
  //       }
  //       if (res.body.status === 'true') {
  //         return self.dispatch(CONSTANT.ME_PROMOTION_CODE_SUCCESS, res.body.code);
  //       }
  //       return self.dispatch(CONSTANT.ME_PROMOTION_CODE_ERROR, res.body.msg ||'获取推广码失败');
  //     });
  // },
  // getPromotionUsers: function () {
  //
  // },
  logout: function (phone) {
    var self = this;
    nprogress.start();
    request
      .post('/Account/LogOut')
      .send({
        loginName: phone,
      })
      .end(function (err, res) {
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.ME_LOGOUT_ERROR, '网络错误');
        }
        if (res.body.success) {
          return self.dispatch(CONSTANT.ME_LOGOUT_SUCCESS,'退出成功');
        }
        return self.dispatch(CONSTANT.ME_LOGOUT_ERROR, res.body.message ||'登出失败');
      });
  }
};
