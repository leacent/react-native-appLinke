'user strict';
var React = require('react-native');
var Router = require('react-native-router');

var Login = require('./login');
var firstRoute = {
  name: '登录',
  component: Login
};
module.exports = React.createClass({
  render: function () {
    return (<Router
      firstRoute = {firstRoute}
    />);
  }
});
