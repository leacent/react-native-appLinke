var stores = require('./store');
var actions = require('./actions');
var Fluxxor = require('fluxxor');

// var flux = new Fluxxor.Flux(stores, actions);

var getFlux = function () {
  var flux;
  return function() {
    if (flux) return flux;
    console.log('create flux');
    flux = new Fluxxor.Flux(stores, actions);
    flux.on("dispatch", function (type, payload) {
      if (console && console.log) {
        console.log('%c[Dispatch] %c', 'color: #006600;', 'color: #000;', type, payload);
      }
    });
    return flux;
  };
};

module.exports = getFlux();
