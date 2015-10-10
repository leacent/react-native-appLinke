var React = require('react-native');
var {
  StyleSheet
} = React;
module.exports = StyleSheet.create({
  touchable: {
    borderWidth: 0,
    borderColor: '#fff',
    shadowColor: "#fff",
    backgroundColor: '#e3e3e3',
    marginVertical: 6,
    marginHorizontal: 8,
    borderRadius: 6
  },
  stage:{
    backgroundColor: '#fff',
    borderWidth: 0,
    shadowColor: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    height: 72
  },
  brief: {
    flex: 10
  },
  toDetail: {
    flex: 1
  },
  arrow: {
    width: 26,
    height: 26
  }
});
