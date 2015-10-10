var React = require('react-native');
var {
  Text,
  TouchableHighlight
} = React;
var styles = require('./style');
module.exports = React.createClass({
  propTypes: {
    text: React.PropTypes.string,
    onPress: React.PropTypes.func,
    status: React.PropTypes.oneOf(['active','disabled'])
  },
  getInitialState: function () {
    return {
      isFormValid: false
    };
  },
  componentDidMount: function () {
    setTimeout(()=>this.setState({isFormValid: true}),5000);
  },
  render: function () {
    var props = this.props;
    return <TouchableHighlight style={[styles.touchable,this.props.style]} onPress={props.onPress} activeOpacity={0.5} underlayColor="#F58669">
      <Text style={[styles.primary, this.props.status==='active' ? styles.primaryAcitve : styles.primaryDisabled]}>{props.text}</Text>
    </TouchableHighlight>
  }
});
