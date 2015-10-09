var React = require('react-native');
var  styles = require('../../styles/index/style.js')
var {
  Text,
  View
} = React;


module.exports = React.createClass({
  toLogin: function () {
    this.props.toRoute({
      name: '登录',
      component: require('../login/login')
    });
  },
  render: function () {
    return (<View>
      <Text onPress={this.toLogin}>EXAMPLE</Text>
    </View>);
  }
});
