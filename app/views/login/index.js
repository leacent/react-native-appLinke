var React = require('react-native');
var  styles = require('../../styles/login/style.js')
var {
  Text,
  View,
  TextInput,
  TouchableOpacity
} = React;
var moment = require('moment');
var FluxMixin = require('../../mixins/flux-mixin');
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;
var PrimaryBtn = require('../../components/button/primary');
var PhoneInput = require('../../components/input/phone');
var PwdInput = require('../../components/input/password');

// var Flash = require('../../components/modal/flash');
// var Example =  require('../index/example');
// console.log(width, height);
module.exports = React.createClass({
  displayName: 'login',
  mixins:[FluxMixin,StoreWatchMixin('MeStore')],
  // getStateFromFlux:function () {
  //   return {
  //     tip: this.getFlux().store('ApplicationStore').getTip(),
  //   };
  // },
  getInitialState: function () {
    return {
      phone: {isValid: false, value: ''},
      pwd: {isValid: false, value:''}
    };
  },
  getStateFromFlux: function () {
    return {
      loginStatus: this.getFlux().store('MeStore').getLoginStatus()
    };
  },
  componentDidMount: function () {
    this.getFlux().actions.application.setNavbar({
      title: '登录'
    });
  },
  componentDidUpdate: function () {
    if (this.state.loginStatus.desc === 'success'&&!this.hasToSuccess) {
      // this.getFlux().actions.application.setTip('登录成功');
      // return this.props.toRoute({
      //   name: '我的主页',
      //   component: require('../index')
      // });
      this.toIndex();
      this.hasToSuccess = true;
    }
    // this.toSignup();
  },
  toSignup: function (e) {
    console.log(e);
    e.preventDefault();
    e.stopPropagation();
    this.props.navigator.push({
      name: '注册',
      index: 3
    });
  },
  toIndex: function () {
    this.props.navigator.push({
      name: '我的主页',
      index: 1
    });
  },
  toLogin: function () {
    console.log('login');
    this.getFlux().actions.me.login({
      phone: this.state.phone.value,
      pwd: this.state.pwd.value
    });
  },
  layout: function (e) {
    console.log(e.nativeEvent);
  },
  setPhoneState: function (isValid, value) {
    this.setState({
      phone: {isValid: isValid, value: value}
    });
  },
  setPwdState: function (isValid, value) {
    this.setState({
      pwd: {isValid: isValid, value: value}
    });
  },
  isFormValid: function () {
    if (this.state.phone.isValid && this.state.pwd.isValid) return true;
    return false;
  },
  render: function() {
    return (
      <View style={styles.container} onLayout={this.layout}>
        <View style={styles.form}>
          <PhoneInput onChangeText={this.setPhoneState} />
          <PwdInput onChangeText={this.setPwdState}/>
          <PrimaryBtn onPress={this.toLogin} text="登录" status={this.isFormValid()?'active':'disabled'}/>
          <TouchableOpacity onPress={this.toSignup}>
            <Text style={styles.toSignup}>新用户 去注册</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
});
