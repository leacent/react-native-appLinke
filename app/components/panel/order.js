const React = require('react-native');
const {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image
} = React;
const styles = require('./style');

module.exports = React.createClass({
  toDetail(id: string) {
    // this.props.navigator.push({
    //   name: 'order',
    //   index: 4
    // });
  },
  render(){
    return <TouchableHighlight onPress={()=>this.toDetail(this.props.id)} style={styles.touchable}>
      <View style={styles.stage}>
        <View style={styles.brief}>
          <Text>
            <Text>门店办理 </Text>
            <Text>2015-08-08交单</Text>
          </Text>
          <Text>13544193956 | 张三</Text>
        </View>
        <View style={styles.toDetail}>
          <Image source={require('../../images/icon/arrow-right.png')} style={styles.arrow}/>
        </View>
      </View>

    </TouchableHighlight>
  }
});
