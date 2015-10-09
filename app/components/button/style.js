var React = require('react-native');
var {
  StyleSheet
} = React;
module.exports = StyleSheet.create({
  touchable: {
    borderRadius: 6
  },
  primary: {
    borderRadius: 6,
    textAlign: 'center',
    height: 44,
    padding: 14,
    backgroundColor: '#eee',
    color: '#a3aab5'
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
