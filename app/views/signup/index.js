var React = require('react-native');
var  styles = require('../../styles/index/style.js')
var {
  Text,
  View,
  TextInput
} = React;
var moment = require('moment');
var FluxMixin = require('../../mixins/flux-mixin');
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;
// var Example =  require('../index/example');

module.exports = React.createClass({
  mixins:[FluxMixin, StoreWatchMixin('ApplicationStore')],
  getStateFromFlux:function () {
    return {
      navbar: this.getFlux().store('ApplicationStore').getNavbar()
    };
  },
  getInitialState: function () {
    return {
      phoneNum: ''
    };
  },
  componentDidMount: function () {
    setTimeout(function () {
      this.getFlux().actions.application.setNavbar({
        title: '注册'
      });
    }.bind(this), 10000);
  },
  toHome: function () {
    console.log('to home');
    this.props.toRoute({
      name: 'example in index',
      component: require('../index/example')
    });
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
           to React {moment().format('YYYY-MM-DD')}
           {this.state.navbar.title || '11111'}
        </Text>
        <Text style={styles.instructions} onPress={()=> {this.toHome()}}>
          注册
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({phoneNum:text})}
          value={this.state.phoneNum}
        />
      </View>
    );
  }
});
