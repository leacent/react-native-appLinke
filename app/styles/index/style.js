var React = require('react-native');
var {
  StyleSheet
} = React;
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
module.exports = StyleSheet.create({

  container: Object.assign(require('../common/container'),{
    paddingTop: 0,
    flexDirection: 'column',
    alignItems: 'stretch'
  }),
  banner: {
    height: 200
  },
  bgImage: {
    resizeMode: 'stretch',
    flex: 1
  },
  touchableOpacity: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 50
  },
  toRecomm: {
    width: 260,
    resizeMode: 'contain',
    backgroundColor: 'transparent'
  },
  shadow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
    position: 'absolute',
    bottom: 0,
    left:0,
    right: 200,
    width: width,
    backgroundColor:'rgba(0,0,0,.4)'
  },
  balance: {
    flex: 7,
    paddingLeft: 10
  },
  toWithdraw: {
    flex: 1
  },
  arrow: {
    width: 26,
    height: 26
  },
  list: {
    flex: 1,
    backgroundColor: '#e3e3e3'
  },

  text: {
    color: '#fff'
  }
});
