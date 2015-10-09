'user strict';
var React = require('react-native');
// var Router = require('react-native-router');
const {Navigator} = React;

var Index = require('./index');
var Login = require('./login');
var Signup = require('./signup');
//
// var firstRoute = {
//   name: '我的主页',
//   component: Index
// };
module.exports = React.createClass({
  _renderScene: function (route, navigator) {
    switch (route.index) {
      case 1:
        return <Index navigator={navigator} />
      case 2:
        return <Login navigator={navigator} />
      case 3:
        return <Signup navigator={navigator} />
      default:
        return <Index navigator={navigator} />
    }
  },
  render() {
    return (
      <Navigator initialRoute={{name:'login', index:2}} renderScene={this._renderScene} />
    )
  }
});
