var React = require('react-native');
var {
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  View,
  Modal
} = React;
var styles = require('./style');
var hasPhone = {};
var validator = require('../../utils/validator');
var FluxMixin = require('../../mixins/flux-mixin');
var {
  isMobile, trimAll
} = require('../../utils/functions');
// var ModalExample = require('./modal').examples;

module.exports = React.createClass({
  mixins:[FluxMixin],
  displayName: 'phoneInput',
  propTypes: {
    checkPhoneType: React.PropTypes.oneOf(['shouldNew','shouldExist'])
  },
  getInitialState: function () {
    return {
      phoneNum: ''
    };
  },
  _onChangeText: function (text) {
    this.setState({phoneNum: text});

    if (isMobile(text).isValid){
      if (this.props.checkPhoneType) {
        this.verifyPhone(text, isValid=>{
          isValid ? this.props.onChangeText(true, trimAll(text)) : this.props.onChangeText(false,text);
        });
      } else {
        this.props.onChangeText(true, trimAll(text));
      }
    } else {
      this.props.onChangeText(false,text);
    }
  },
  clear: function () {
    this.setState({phoneNum:''});
  },
  _onBlur: function () {
    var phoneNum = this.state.phoneNum;
    if (!isMobile(phoneNum).isValid) {
      this.getFlux().actions.application.setTip(isMobile(phoneNum).msg);
    }
  },
  getIcon: function () {
    var phoneNum = this.state.phoneNum;
    var checkPhoneType = this.props.checkPhoneType;
    if (!phoneNum) return null;
    if (phoneNum.length < 11 || !isMobile(phoneNum).isValid) {
      return <TouchableOpacity style={styles.iconWrap} onPress={this.clear}>
        <Image style={styles.icon} source={require('../../images/icon/cha.png')} />
      </TouchableOpacity>
    }
    if (!checkPhoneType) {
      return <Image style={[styles.iconWrap,styles.icon]} source={require('../../images/icon/gou.png')} />
    }
    if (hasPhone[phoneNum] === undefined) {
      return <Image style={[styles.iconWrap,styles.icon]} source={require('../../images/icon/loading.png')} />
    }
    // return;
    if (checkPhoneType === 'shouldExist') {
      if (hasPhone[phoneNum]) {
        return  <Image style={[styles.iconWrap,styles.icon]} source={require('../../images/icon/gou.png')} />
      } else {//手机号未注册过
        return <TouchableOpacity style={styles.iconWrap} onPress={this.clear}>
          <Image style={styles.icon} source={require('../../images/icon/cha.png')} />
        </TouchableOpacity>
      }
    } else if (checkPhoneType === 'shouldNew') {
      if (!hasPhone[phoneNum]) {
        return <Image style={[styles.iconWrap,styles.icon]} source={require('../../images/icon/gou.png')} />
      } else {
        // this.flash('该手机号已注册过');
        return <TouchableOpacity style={styles.iconWrap} onPress={this.clear}>
          <Image style={styles.icon} source={require('../../images/icon/cha.png')} />
        </TouchableOpacity>
      }
    }
  },
  verifyPhone: function (phone,callback) {
    if (hasPhone[phone] !== undefined) {
      if (this.props.checkPhoneType === 'shouldExist') {
          if (hasPhone[phone]) {
            callback(true);
          }else{
            this.getFlux().actions.application.setTip('该手机号未注册过');
            callback(false);
          }
      }else{
        if (!hasPhone[phone]) {
          callback(true);
        }else{
          this.getFlux().actions.application.setTip('该手机号已注册过');
          callback(false);
        }
      }
      // this.forceUpdate();
      return;
    }

    validator.isPhoneExist(phone,(err,res) => {
      console.log(err,res);
      if (err) return;
      // res = '不存在';
      if (/已存在/.test(res)) {
        hasPhone[phone] = true;
      } else if (/不存在/.test(res)) {
        hasPhone[phone] = false;
      }
      return this.verifyPhone(phone, callback);
    });
  },
  render: function () {
    var props = this.props;
    return <View style={styles.inputWrap}>
    <TextInput
        style={styles.input}
        onChangeText={this._onChangeText}
        onBlur={this._onBlur}
        value={this.state.phoneNum}
        placeholder='手机号码'
        keyboardType='numeric'
        returnKeyType='next'
        maxLength={11}
    />
    {this.getIcon()}
    </View>
  }
});
