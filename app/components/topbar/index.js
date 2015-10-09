var React = require('react-native');
const {View, Text} = React;
const styles = require('./style');
var FluxMixin = require('../../mixins/flux-mixin');
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;

module.exports = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('ApplicationStore')],
  getStateFromFlux: function () {
    return {
      navbar: this.getFlux().store('ApplicationStore').getNavbar()
    };
  },
  render() {
    return <View style={styles.container}>
      <Text style={styles.title}>{this.state.navbar.title}</Text>
    </View>
  }
});
