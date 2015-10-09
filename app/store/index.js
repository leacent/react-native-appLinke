var ApplicationStore = require('./application');
// var CityStore = require('./city');
// var BrokerStore = require('./broker');
// var OrderStore = require('./order');
var MeStore = require('./me');
// var CardStore = require('./card');
// var BillStore = require('./bill');
// var BankStore = require('./bank');
// var IncomeStore = require('./income');

module.exports = {
  ApplicationStore: new ApplicationStore(),
  // CityStore: new CityStore(),
  // BrokerStore: new BrokerStore(),
  // OrderStore: new OrderStore(),
  MeStore: new MeStore()
  // CardStore: new CardStore(),
  // BillStore: new BillStore(),
  // BankStore: new BankStore(),
  // IncomeStore: new IncomeStore()
};
