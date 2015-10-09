var request = require('./superagent');
// var note = require('./note');
var _ = require('lodash');
var noop = function(){};

exports.CONSTANT = {
  SMS_CAPTCHA_TYPE: {
    UPDATE_PHONE: 4,
    REGISTER: 2,
    REGISTER_ACTIVE: 1
  },
  IMG_CAPTCHA_TYPE: {
    UPDATE_PHONE: 4,
    REGISTER: 2,
    REGISTER_ACTIVE: 1
  }
};
// 验证手机号是否存在
exports.isPhoneExist = function (phone,end) {
  end = end || noop;
  request
    .post('/Account/CheckPhone')
    .send({
      phone: phone
    })
    .end(function (err, res) {
      if (err){
        return end(err);
      }
      if (res.body.success) {
        return end(null,'号码不存在');
      }
      if (/已存在/.test(res.body.message)) {
        return end(null,'号码已存在');
      }
      return end(res.body.message);
    });
};
// 获取短信验证码
exports.getSmsCaptcha =  function (phone, type, end) {
  end = end || noop;
  request
    .post('/Code/GenerateMsgCode')
    .send({
      phone: phone,
      msgCodeType: type
    })
    .end(function (err, res) {
      if (err) {
        return end(err);
      }
      if (res.body.success) {
        return end(null, res.body.data||'验证码发送成功');
      }
      return end(res.body.message || '发送失败');
    });
};
// 验证图形验证码
exports.valideImgCaptcha = function (captcha, type, end) {
  end = end || noop;
  request
    .post('/Code/ValidateImgCode')
    .send({
      imgCodeType: type,
      imgCode: captcha
    })
    .end(function (err, res) {
      if (err) {
        return end(err);
      }
      if (res.body.success) {
        return end(null, '验证成功');
      }
      return end(res.body.message||'验证失败');
    });
};
exports.valideSmsCaptcha = function (phone, captcha, type, end) {
  end = end || noop;
  request
    .post('/Code/ValidateMsgCode')
    .send({
      phone: phone,
      msgCode: captcha,
      msgCodeType: type
    })
    .end(function (err, res) {
      if (err) {
        return end(err);
      }
      if (res.body.success) {
        return end(null, '验证成功');
      }
      return end(res.body.message||'验证失败');
    });
};
