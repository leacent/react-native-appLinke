var React = require('react-native');
var  styles = require('../../styles/login/style.js')
var {
  Text,
  View,
  TextInput,
  TouchableHighlight
} = React;
var moment = require('moment');
var FluxMixin = require('../../mixins/flux-mixin');
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;
var PrimaryBtn = require('../../components/button/primary');
var PhoneInput = require('../../components/input/phone');
var PwdInput = require('../../components/input/password');

var Flash = require('../../components/modal/flash');
// var Example =  require('../index/example');
// console.log(width, height);
module.exports = React.createClass({
  displayName: 'login',
  mixins:[FluxMixin],
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
  componentDidMount: function () {
    // setTimeout(function () {
    //   this.getFlux().actions.application.setTip('sdsdfsdf');
    // }.bind(this), 0);
  },
  toSignup: function () {
    this.props.toRoute({
      name: '注册',
      component: require('../signup')
    });
  },
  toLogin: function () {
    console.log(this.getFlux().actions);
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
          <PhoneInput onChangeText={this.setPhoneState} checkPhoneType="shouldExist"/>
          <PwdInput onChangeText={this.setPwdState}/>
          <PrimaryBtn onPress={this.toLogin} text="登录" status={this.isFormValid()?'active':'disabled'}/>
        </View>
        <Flash />
      </View>
    );
  }
});
