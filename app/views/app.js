'user strict';
var React = require('react-native');
// var Router = require('react-native-router');
const {Navigator, View, Text} = React;
const styles =  require('../styles/app');
var Topbar = require('../components/topbar');
var Footer = require('../components/footer');
var Flash = require('../components/modal/flash');
var Index = require('./index');
var Login = require('./login');
var Signup = require('./signup');
//
// var firstRoute = {
//   name: '我的主页',
//   component: Index
// };
var App = React.createClass({
  render() {
    return <View style={styles.application}>
      <View style={styles.topbar}>
        <Topbar />
      </View>
      <View style={styles.main}>
        {this.props.children}
        <Flash />
      </View>
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  }
});

module.exports = React.createClass({
  _renderScene: function (route, navigator) {
    switch (route.index) {
      case 1:
        return <App><Index navigator={navigator} /></App>
      case 2:
        return <App><Login navigator={navigator} /></App>
      case 3:
        return <App><Signup navigator={navigator} /></App>
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
