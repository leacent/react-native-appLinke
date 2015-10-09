'user strict';
var React = require('react-native');
var Router = require('react-native-router');

// var stores = require('../store');
// var actions = require('../actions');
// var Fluxxor = require('fluxxor');
//
// var flux = new Fluxxor.Flux(stores, actions);

// flux.on("dispatch", function (type, payload) {
//   if (console && console.log) {
//     console.log('%c[Dispatch] %c', 'color: #006600;', 'color: #000;', type, payload);
//   }
// });

var Login = require('./login');
var firstRoute = {
  name: '登录',
  component: Login
};
module.exports = React.createClass({
  render: function () {
    return (<Router
      firstRoute = {firstRoute}
    />);
  }
});
