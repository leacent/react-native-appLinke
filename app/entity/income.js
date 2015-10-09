//  按月归总的收益
exports.defaultIncomeByMonth = {
  id: '',
  createAt: '',
  total:'',
  incomes:[
    {
      id: '',
      createAt: '',
      type: '',
      total:''
    }
  ]
};

exports.defaultIncome = {
  id: '',
  createAt: '',
  type:'',
  total: '',
  extra: {
    fromWho: '',
    phone: '',
    loanType: '',
    loanTotal: '',
    loadPeriod: '',
    desc: '',
    city: ''
  }
};

exports.list = {
  id: 'brokerageID',
  createAt: 'month|timestamp',
  total: 'money'
};

exports.income = {
  id: "brokerageDetailID",
  createAt: 'brokerageTime|timestamp',
  type: "brokerageMark|num",
  total: 'brokerageMoney',
  extra: {
    city: 'city',
    loanPeriod: 'loanPeriod',
    loanTotal: 'orderMoney',
    fromWho: 'source',
    phone: 'phone',
    desc: 'remark',
    loanType: 'loanType'
  }
};
