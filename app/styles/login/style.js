var React = require('react-native');
var _ = require('lodash');
var {
  StyleSheet
} = React;
var Dimensions = require('Dimensions');

var {width, height} = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: _.assign({},{
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#f7f7f7',
    width: width
  }),
  form: {
    alignItems: 'stretch',
    flexDirection: 'column',
    width: 240,
    marginTop: 80
  },
  toSignup: {
    color: '#f97f5f',
    alignSelf: 'center'
  },
  btn: {
    marginTop: 80,
    marginBottom: 100,
    borderRadius: 6
  }
});
