var React = require('react-native');
var {
  StyleSheet
} = React;
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
module.exports = StyleSheet.create({
  container: {
    marginTop: 14,
    height: height,
    backgroundColor: '#333',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  touchable:{
    backgroundColor: 'red',
    flex: 1,
    height: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  menu: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    flex: 1
  },
  title: {
    color: '#fff',
    flex:10,
    textAlign: 'center'
  }
});
