var util = require('../utils/functions');
var note = require('../utils/note');
var validator = require('../utils/validator');

module.exports = {
  getInitialState: function () {
    return {
      isFormValid: false
    };
  },
  componentWillMount: function () {
    this._initValidator();
  },
  _initValidator: function () {
    // this.isValid = {
    //   phoneNum: ''
    //   pwd: '',
    //   imgCaptcha: '',
    //   smsCaptcha: ''
    // };
    this.initValidator();
    this._formValidate();
  },
  _onPhoneChange: function (e) {
    var value = e.target.value;
    $(e.target).removeClass('error');
    if (util.isMobile(value).isValid) {
      this.isValid.phoneNum = true;
    } else {
      this.isValid.phoneNum = false;
    }
    this._formValidate();
    // LCache.set('login.phoneNum', value);
  },
  _onPhoneBlur: function (e, opts) {
    var self = this, el = e.target;
    if (!this.isValid.phoneNum) {
      $(el).addClass('error');
      note.flash(util.isMobile(el.value).msg);
      return;
    }
    opts = opts || {};
    if (opts.isToVerify) {
      validator.isPhoneExist(util.trimAll(el.value), function (err, res) {
        if (err) {
          $(el).addClass('error');
          note.flash('手机号码已注册过');
          self.isValid.phoneNum = false;
          self.forceUpdate();
          return;
        }
        self.isValid.phoneNum = true;
        self.forceUpdate();
      });
    }
  },
  _onPwdChange: function (e) {
    var value = util.trimAll(e.target.value);
    if (!value) {
      this.isValid.pwd = false;
    } else {
      this.isValid.pwd = true;
    }
    this._formValidate();
    // LCache.set('login.pwd', value);
  },
  _onSmsCaptChange: function (e) {
    var value = util.trimAll(e.target.value);
    $(e.target).removeClass('error');
    if (!value) {
      this.isValid.smsCaptcha = false;
    }
    this._formValidate();
    // LCache.set('login.captcha.sms', value);
  },
  _onSmsCaptBlur: function (e, phone, type) {
    // if (!this.isValid.smsCaptcha) {
    //   $(e.target).addClass('error');
    // }
    var self = this, el = e.target;
    if (!util.trimAll(e.target.value)) {
      note.flash('短信验证码为空');
      return $(el).addClass('error');
    }
    validator.valideSmsCaptcha(phone, util.trimAll(e.target.value), type, function (err, res) {
      if (err) {
        $(el).addClass('error');
        self.isValid.smsCaptcha = false;
        note.flash('短信验证码错误');
        self.forceUpdate();
        return;
      }
      self.isValid.smsCaptcha = true;
      self.forceUpdate();
    });
  },
  _onImgCaptChange: function (e) {
    var value = util.trimAll(e.target.value);
    $(e.target).removeClass('error');
    this.isValid.imgCaptcha = false;
    // if (!value) {
    //   this.isValid.imgCaptcha = false;
    // }
    this._formValidate();
    // LCache.set('login.captcha.img', value);
  },
  _onImgCaptBlur: function (e, type) {
    var self = this, el = e.target;
    if (!util.trimAll(e.target.value)) {
      note.flash('图形验证码为空');
      return $(el).addClass('error');
    }
    validator.valideImgCaptcha(util.trimAll(e.target.value), type, function (err, res) {
      if (err) {
        $(el).addClass('error');
        note.flash('图形验证码错误');
        return (self.isValid.imgCaptcha = false);
      }
      self.isValid.imgCaptcha = true;
      self.forceUpdate();
    });
  },
  _getSms: function (phone, type) {
    var self = this;
    validator.getSmsCaptcha(phone, type, function (err, res) {
      if(err) {
        return;
      }
      self.clock.start();
      note.flash('短信发送成功');
      self.setState({
        canSendSms: false
      });
    });
  },
  _createImgCaptcha: function (type) {
    return '/Code/GenerateImgCode?imgCodeType='+type+'&time='+Math.random();
  },
  _formValidate: function () {
    var values = _.values(this.isValid);
    if (_.sum(values) === values.length){
      this.setState({isFormValid: true});
    } else {
      this.setState({isFormValid: false});
    }
    (this.formValidate || function(){})();
  }
};
