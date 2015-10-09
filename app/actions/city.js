var request = require('../utils/superagent');
var CONSTANT = require('../constant/');
var objectPath = require('object-path');
var muder = require('../utils/muder');
var cityAdaptor = require('../entity/city');
var nprogress = require('../utils/nprogress');

module.exports = {
  getCityList: function (id) {
    var self = this;
    nprogress.start();
    request
      .post('/Member/GetCityList')
      .query({
        cityKey: id ||'',
        cityName: ''
      })
      .end(function (err, res) {
        nprogress.done();
        if (err) return alert('获取城市信息错误');
        if (res.body.success) {
          var result;
          result = _.map(res.body.data, function (city) {
            return muder(city, cityAdaptor.city);
          });
          return self.dispatch(CONSTANT.CITY_LIST_SUCCESS, {
            id: id,
            cityList: result
          });
        }
        self.dispatch(CONSTANT.CITY_LIST_SUCCESS,{});
      });
  },
  getProvinceList: function () {
    var self = this;
    nprogress.start();
    request
      .post('/Member/GetCityList')
      .query({
        cityKey: '',
        cityName: ''
      })
      .end(function (err, res) {
        nprogress.done();
        if (err) return alert('获取城市信息错误');
        if (res.body.success) {
          var result;
          result = _.map(res.body.data, function (province) {
            return muder(province, cityAdaptor.province);
          });
          return self.dispatch(CONSTANT.PROVINCE_LIST_SUCCESS, result);
        }
        self.dispatch(CONSTANT.PROVINCE_LIST_SUCCESS,[]);
      });
  }

};
