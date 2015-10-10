const React = require('react-native');
const  styles = require('../../styles/signup');
const {
  Text,
  View,
  TextInput,
  TouchableOpacity
} = React;
const FluxMixin = require('../../mixins/flux-mixin');
const StoreWatchMixin = require('fluxxor').StoreWatchMixin;
const PhoneInput = require('../../components/input/phone');
const PrimaryBtn = require('../../components/button/primary');
const PwdInput = require('../../components/input/password');

module.exports = React.createClass({
  mixins:[FluxMixin, StoreWatchMixin('ApplicationStore')],
  getStateFromFlux:function () {
    return {
      navbar: this.getFlux().store('ApplicationStore').getNavbar()
    };
  },
  getInitialState: function () {
    return {
      phone: {isValid: false, value: ''},
      pwd: {isValid: false, value:''}
    };
  },
  componentDidMount: function () {
    this.getFlux().actions.application.setNavbar({
      title: '注册'
    });
  },
  toHome: function () {
    console.log('to home');
    this.props.navigator.push({
      name: 'index',
      index: 1
    });
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
  toLogin: function () {
    this.props.navigator.push({
      name: '登录',
      index: 2
    });
  },
  render: function() {
    return (
      <View style={styles.container}>
      <View style={styles.form}>
        <PhoneInput onChangeText={this.setPhoneState} checkPhoneType="shouldNew"/>
        <PwdInput onChangeText={this.setPwdState}/>
        <PrimaryBtn onPress={this.toLogin} style={styles.primaryBtn} text="注册" status={this.isFormValid()?'active':'disabled'}/>
        <TouchableOpacity onPress={this.toLogin}>
          <Text style={styles.toLogin}>登录</Text>
        </TouchableOpacity>
      </View>
      </View>
    );
  }
});
