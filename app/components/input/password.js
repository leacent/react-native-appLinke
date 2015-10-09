var React = require('react-native');
var {
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  View,
  Modal
} = React;
var styles = require('./style');
var {isPwdValid, trimAll} = require('../../utils/functions');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      pwd: ''
    };
  },
  getIcon: function () {
    if (!this.state.pwd) return null;
    return <TouchableOpacity style={styles.iconWrap} onPress={this.clear}>
      <Image style={styles.icon} source={require('../../images/icon/cha.png')} />
    </TouchableOpacity>
  },
  clear: function () {
    this.setState({pwd:''});
  },
  _onChangeText: function (text) {
    this.setState({pwd: text});
    if (isPwdValid(text).isValid){
      this.props.onChangeText(true, trimAll(text));
    } else {
      this.props.onChangeText(false, trimAll(text));
    }
  },
  render: function () {
    return <View style={styles.inputWrap}>
    <TextInput
        style={styles.input}
        onChangeText={this._onChangeText}
        onBlur={this.onBlur}
        value={this.state.pwd}
        placeholder='密码'
        secureTextEntry={true}
        returnKeyType='go'
        maxLength={20}
    />
    {this.getIcon()}
    </View>
  }
});
