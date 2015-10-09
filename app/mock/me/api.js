var basic = require('./basic');
var login = require('./login');
var promotion = require('./promotion');

module.exports = {
  "POST /Account/GetPersonalInfo": function(req, res){
    return res.json(basic.success);
  },
  "POST /Account/Login": function(req, res){
    return res.json(login.success);
  },
  "POST /Member/GetSpreadData": function(req, res){
    return res.json(promotion.code);
  },
  "POST Member/GetPersonalSpread": function(req, res){
    return res.json(promotion.users);
  }
};
