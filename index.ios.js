 'user strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var App = require('./app/views/app');


AppRegistry.registerComponent('appLinke', () => App);
