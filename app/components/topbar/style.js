var React = require('react-native');
var {
  StyleSheet
} = React;

module.exports = StyleSheet.create({
  container: {
    marginTop: 14,
    height: 45,
    backgroundColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchable:{
    marginLeft: 10
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
