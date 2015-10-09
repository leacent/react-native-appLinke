var citylist = require('./city_list');
var provinceList = require('./province_list');

module.exports = {
  "POST /Member/GetCityList": function(req, res){
    var query = req.query;
    var cityKey = query.cityKey;
    var cityName = query.cityName;
    if (!cityKey) {
      return res.json(provinceList);
    }
    return res.json(citylist);
  }
};
