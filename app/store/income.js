var Fluxxor = require('fluxxor');
var CONSTANT = require('../constant');
var _ = require('lodash');
var Backbone = require('backbone');
var trimList = require('../utils/functions').trimList;

module.exports = Fluxxor.createStore({
  initialize: function () {
    this.incomes = new Backbone.Collection();
    this.isFetchIncomes = false;
    this.incomesByMonth = new Backbone.Collection();
    this.incomesByMonth.comparator = function (income) {
      return -income.get('createAt');
    };
    this.bindActions(
      CONSTANT.INCOME_LIST_SUCCESS, this.onIncomeListSuccess,
      CONSTANT.INCOME_LIST_ERROR, this.onIncomeListError,

      CONSTANT.INCOME_GET_SUCCESS, this.onIncomeGetSuccess,
      CONSTANT.INCOME_GET_ERROR, this.onIncomeGetError,

      CONSTANT.INCOME_LIST_BYMONTH_SUCCESS, this.onIncomeListBymonthSuccess,
      CONSTANT.INCOME_LIST_BYMONTH_ERROR, this.onIncomeListBymonthError,
      CONSTANT.ME_LOGOUT_SUCCESS, this.onLogOutSuccess
    );
  },
  onLogOutSuccess: function () {
    this.incomes.reset();
    this.isFetchIncomes = false;
    this.incomesByMonth.reset();
  },
  onIncomeListSuccess: function (list) {
    this.incomesByMonth.add(list,{merge:true});
    this.isFetchIncomes = true;
    this.emit('change');
  },
  onIncomeListBymonthSuccess: function (wrap) {
    var monthId = wrap.id, incomes = wrap.incomes;
    if (this.incomesByMonth.get(monthId)) {
      this.incomesByMonth.get(monthId).set('incomes',incomes);
    } else {
      this.incomesByMonth.add({id: monthId, incomes: incomes});
    }
    // this.incomesByMonth.add(list,{merge: true});
    this.emit('change');
  },
  onIncomeGetSuccess: function (income) {
    this.incomes.add(trimList(income),{merge: true});
    this.emit('change');
  },
  onIncomeListError: function () {
  },
  onIncomeListBymonthError: function () {
  },
  onIncomeGetError: function () {
  },
  getIncomes: function () {
    return this.incomesByMonth.models;
  },
  getIncomesByMonth: function (monthId) {
    return (this.incomesByMonth.get(monthId) || new Backbone.Model()).get('incomes') || [];
  },
  getIncome: function (id) {
    return (this.incomes.get(id) || {}).attributes || {};
  },
  hasFetchIncomes: function () {
    return this.isFetchIncomes;
  }

});
