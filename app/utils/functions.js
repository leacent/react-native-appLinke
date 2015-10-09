var _ = require('lodash');
// var cookie = require('component-cookie');
var trimAll;

exports.isMobile = function (val) {
  var result = {isValid: false, msg: ''};
  val = trimAll(val);
  if (!val) {
    result.msg = '手机号为空';
  } else if (!/^1\d{10}$/i.test(val)) {
    result.msg = '手机号无效';
  } else {
    result.isValid = true;
  }
  return result;
};
exports.isPwdValid = function (val) {
  var result = {isValid: false, msg: ''};
  val = trimAll(val);
  if (!val) {
    result.msg = '密码为空';
  } else if (val.length < 6 || val.length > 18) {
    result.msg = '密码长度需为6-18位';
  } else {
    result.isValid = true;
  }
  return result;
};
exports.isIdentityCard = function (str) {

};
// 规则：16位-19位的数字
exports.isBankCardNum = function (val) {
  var result = {isValid: false, msg: ''};
  val = this.trimAll(val);
  if (!val) {
    result.msg = '卡号为空';
  } else if (!/^\d{16,19}$/.test(val)) {
    result.msg = '银行卡号无效';
  } else {
    result.isValid = true;
  }
  return result;
};
exports.isNumber = function (val) {
  val = _.trim(val);
  return !/[^\d]/.test(val);
};
exports.trimAll = trimAll = function (val) {
  val+='';
  return val.replace(/\s/g,'');
};
exports.hasLogged = function () {
  return !!cookie('token');
};

// hanle json object and array
var trimList;
exports.trimList = trimList = function (list) {
  var trimObject = function (item) {

    _.forEach(item, function (val, key) {
      if (val === '') {
        delete item[key];
      } else if(typeof val === 'object') {
        trimList(val);
      }
    });
    return item;
  };
  if (list instanceof Array) {
    _.forEach(list, trimObject);
  } else {
    trimObject(list);
  }
  return list;
};

exports.isEmail = function (val) {
  var regex = /^(\w+)([\-+.][\w]+)*@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/;
  return regex.test(val);
};
