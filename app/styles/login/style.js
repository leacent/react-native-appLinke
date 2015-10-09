var React = require('react-native');
var {
  StyleSheet
} = React;
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

module.exports = StyleSheet.create({
  input: Object.assign(require('../common/input'),{
  }),
  container: {
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: height,
    flexDirection: 'row'
  },
  form: {
    alignItems: 'stretch',
    flexDirection: 'column',
    width: 240
  },
  loginBtn: Object.assign(require('../common/button'),{

  }),
  hoverBtn: {
    backgroundColor: 'red'
  }
});
