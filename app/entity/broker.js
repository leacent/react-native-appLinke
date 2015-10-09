exports.default ={
  id: '',
  name: '',
  recommend: {
    total: 0,
    totalCount: 0,
    dealCount:0,
    dealPersonCount: 0
  },
  phone: '',
  isDefault: false
};


exports.broker = {
  id: 'brokerID',
  name: 'brokerName',
  recommend: {
    total: 'orderMoneyToRecommend|num',
    totalCount: 'orderTotal|num',
    dealCount: 'orderDealTotal|num'
  },
  phone: 'phone',
  isDefault: false
};

exports.brokerInList = {
  id: 'UserId',
  name: 'UserName',
  recommend: {
    total: 'OrderMoneyToRecommend|num',
    totalCount: 'OrderTotal|num',
    dealCount: 'OrderDealTotal|num'
  },
  phone: 'phone',
  isDefault: false
};

exports.brokerInRankList = {
  id: 'BrokerID',
  recommend: {
    total: 'Performance|num',
    dealPersonCount: 'ClientCount|num'
  },
  name: 'RealName'
};
