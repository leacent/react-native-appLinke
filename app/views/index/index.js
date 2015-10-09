var React = require('react-native');
var  styles = require('../../styles/index/style.js')
var {
  Text,
  View
} = React;
var moment = require('moment');
var FluxMixin = require('../../mixins/flux-mixin');
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;

module.exports = React.createClass({
  mixins:[FluxMixin],
  // getStateFromFlux:function () {
  //   return {
  //     navbar: this.getFlux().store('ApplicationStore').getNavbar()
  //   };
  // },
  componentDidMount: function () {
    this.getFlux().actions.application.setNavbar({
      title: '我的主页'
    });
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
        <Text style={styles.welcome}>
           我的主页 {moment().format('YYYY-MM-DD')}
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
