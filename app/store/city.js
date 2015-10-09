var Fluxxor = require('fluxxor');
var CONSTANT = require('../constant');
var _ = require('lodash');

module.exports = Fluxxor.createStore({
  initialize: function () {
    this.cityList = [];
    this.provinceList = [];
    this.bindActions(
      CONSTANT.CITY_LIST_SUCCESS, this.onCityListSuccess,
      CONSTANT.PROVINCE_LIST_SUCCESS, this.onProvinceListSuccess

    );
  },
  // @city
  // city.id : the cityKey to get city list
  // city.cityList : target city list. example ['广州','深圳']
  onCityListSuccess: function (city) {
    var output = {}, cityList = city.cityList;
    output.id = city.id;
    output.cityList = cityList;
    this.cityList.push(output);
    this.cityList = _.uniq(this.cityList, function (city) {
      return city.id;
    });
    this.emit("change");
  },
  onProvinceListSuccess: function (provinceList) {
    var output = this.provinceList.concat(provinceList);
    output = _.uniq(output, function (i) {
      return i.id;
    });
    this.provinceList = output;
    this.emit("change");
  },
  getCityList: function (id) {
    var result =  _.find(this.cityList, function(city) {
      return city.id === id;
    });

    return result || {};
  },
  getProvinceList: function () {
    return this.provinceList;
  }

});
