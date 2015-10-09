var React = require('react-native');
var {
  StyleSheet
} = React;


module.exports = StyleSheet.create({
  container: Object.assign(require('../common/container'),{
  }),
  form: {
    alignItems: 'stretch',
    flexDirection: 'column',
    width: 240,
  },
  toLogin: {
    color: '#f97f5f',
    alignSelf: 'center'
  }
});
