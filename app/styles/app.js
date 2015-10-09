var React = require('react-native');
var {
  StyleSheet
} = React;
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
module.exports = StyleSheet.create({
  application: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  topbar: {
    flex:1
  },
  main: {
    height: height-40-45-20,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  footer: {
    flex: 1
  }
});
