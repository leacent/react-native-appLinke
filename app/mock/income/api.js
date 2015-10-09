var incomes = require('./incomes');
var bymonth = require('./bymonth');
var detail = require('./detail');

module.exports = {
  "POST /Finance/GetPersonalBrokerages": function(req, res){
    return res.json(incomes.success);
  },
  "POST /Finance/GetPersonalBrokerageDetailsByBrokerageID": function(req, res){
    return res.json(bymonth.success);
  },
  "POST /Finance/GetBrokerageDetailInfoByID": function(req, res){
    return res.json(detail.success);
  },
};
