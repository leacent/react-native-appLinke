var React = require('react-native');
var Fluxxor = require('fluxxor');

var FluxMixin = Fluxxor.FluxMixin(React);
var flux = require('../flux')();

module.exports = Object.assign(FluxMixin,{
  getDefaultProps: function () {
    return {
      flux: flux
    };
  }
});
