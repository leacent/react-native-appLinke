var React = require('react-native');
const {View, Text, Image,TouchableOpacity} = React;
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
  test: function () {
    // ()=>this.props.onPressMenu()
    console.log('test');
  },
  render() {
    return <View style={styles.container}>
      <TouchableOpacity onPress={()=>this.props.onPressMenu()} style={styles.touchable}>
      <Image source={require('../../images/icon/menu.png')} style={styles.menu}
        onPress={this.test}
      />
      </TouchableOpacity>
      <Text style={styles.title}>{this.state.navbar.title}</Text>
    </View>
  }
});
