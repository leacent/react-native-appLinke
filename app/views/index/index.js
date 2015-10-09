var React = require('react-native');
var  styles = require('../../styles/index/style.js')
var {
  Text,
  View
} = React;
var moment = require('moment');
var FluxMixin = require('../../mixins/flux-mixin');
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;

var Login = require('../login/login');

module.exports = React.createClass({
  mixins:[FluxMixin, StoreWatchMixin('ApplicationStore')],
  getStateFromFlux:function () {
    return {
      navbar: this.getFlux().store('ApplicationStore').getNavbar()
    };
  },
  componentDidMount: function () {
    setTimeout(function () {
      this.getFlux().actions.application.setNavbar({
        title: '这是个测试'
      });
    }.bind(this), 10000);
  },
  toLogin: function () {
    this.props.toRoute({
      name: '登录',
      component: Login
    });
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
           to React {moment().format('YYYY-MM-DD')}
           {this.state.navbar.title || '11111'}
        </Text>
        <Text style={styles.instructions} onPress={this.toLogin}>
          index
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
});
