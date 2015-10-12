var React = require('react-native');
var {
  StyleSheet
} = React;
module.exports = StyleSheet.create({
  touchable: {
    borderRadius: 6,
    overflow: 'hidden'
  },
  primary: {
    textAlign: 'center',
    height: 44,
    padding: 14,
    color: '#a3aab5',
    backgroundColor: '#eee'
  },
  primaryAcitve: {
    color: '#fff',
    backgroundColor: '#f7592f'
  },
  primaryDisabled: {
    color: '#a3aab5',
    backgroundColor: '#eee'
  }
});
