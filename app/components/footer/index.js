var React = require('react-native');
const {View, Text} = React;
const styles = require('./style');

module.exports = React.createClass({
  render() {
    return <View style={styles.container}>
      <Text style={styles.title}>深圳市xx信息技术有限公司</Text>
    </View>
  }
});
