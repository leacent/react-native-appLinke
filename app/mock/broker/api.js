var defaultBroker = require('./defaultBroker');
var brokerList = require('./broker_list');
var rankByTotal = require('./rankByTotal');
var rankByPerson = require('./rankByPerson');

var flag = true;

module.exports = {
  'POST /Product/GetDefaultBroke': function (req, res) {
    return res.json(defaultBroker);
  },
  'POST /Product/GetBrokeList': function (req, res) {
    return res.json(brokerList);
  },
  'POST /Order/GetBrokerRank': function (req, res) {
    if (flag){
      flag = !flag;
      return res.json(rankByPerson);
    }else{
      flag = !flag;
      return res.json(rankByTotal);
    }
  },

};
