var React = require('react-native');
const {View, Text, Image,TouchableHighlight} = React;
const styles = require('./style');

module.exports = React.createClass({
  toLogin: function () {
    this.props.navigator.push({
      index: 2,
      name: '主页'
    });
  },
  render() {
    return <View style={styles.container}>
      <TouchableHighlight onPress={this.toLogin} style={styles.touchable}>
        <Text>注册</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={this.toLogin} style={styles.touchable}>
        <Text>登录</Text>
      </TouchableHighlight>
    </View>
  }
});
