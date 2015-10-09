var React = require('react-native');
var {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;
var FluxMixin = require('../../mixins/flux-mixin');

var styles = StyleSheet.create({
  container: {
    padding: 10,
    alignSelf: 'center',
    marginVertical: 220,
    width: 120,
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  text: {
    color: '#fff'
  }
});
module.exports = React.createClass({
  mixins:[FluxMixin,StoreWatchMixin('ApplicationStore')],
  propTypes: {
    visible: React.PropTypes.bool,
    text: React.PropTypes.string
  },
  getStateFromFlux: function () {
    return {
      tip: this.getFlux().store('ApplicationStore').getTip()
    };
  },
  render: function () {
    return <Modal animated={false} transparent={true} visible={this.state.tip.visible}>
        <View style={styles.container}>
            <Text style={styles.text}>{this.state.tip.text}</Text>
        </View>
      </Modal>
  }
});
