const React = require('react-native');
const  styles = require('../../styles/index/style.js')
const {
  Text,
  View,
  Image,
  ListView
} = React;
const moment = require('moment');
const FluxMixin = require('../../mixins/flux-mixin');
const StoreWatchMixin = require('fluxxor').StoreWatchMixin;

module.exports = React.createClass({
  mixins:[FluxMixin,StoreWatchMixin('OrderStore')],
  getStateFromFlux:function () {
    const orderStore = this.getFlux().store('OrderStore');
    var ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2});
    return {
      orders: ds.cloneWithRows(orderStore.getRecommendList()),
      hasFetch: orderStore.hasFetchRecommend()
    };
  },
  componentWillMount() {
    if(!this.state.hasFetch) {
      this.getFlux().actions.order.getRecommendList();
    }
  },
  componentDidMount: function () {
    this.getFlux().actions.application.setNavbar({
      title: '我的主页'
    });
  },
  toLogin: function () {
    this.props.navigator.push({
      name: '登录',
      index: 2
    });
  },
  _renderRow: function (order: Object, sectionID: number|string, rowID: number|string) {
    return <View>
    <Text style={styles.text}>{order.get('user').name}ffff</Text>
    </View>
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.banner}>
           <Image source={require('../../images/index/banner-bg.jpg')} style={styles.bgImage}>
           </Image>
        </View>
        <View style={styles.list}>
          <ListView
            dataSource={this.state.orders}
            renderRow={this._renderRow}
          />
        </View>
      </View>
    );
  }
});
