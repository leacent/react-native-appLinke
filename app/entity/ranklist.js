// 按成交总额排行
exports.rankByTotal = {
  name: 'brokerName',
  ranklist: [
    {
      id: 'BrokerID',
      total: 'Performance',
      name: 'RealName',
      rankByTotal: 'RowNum'
    }
  ],
  rankByTotal: 'myRank',
  totalDistance: 'up',
  brokers: 'sum'
};

//按成交人数排行
exports.rankByCount = {
  name: 'brokerName',
  ranklist: [
    {
      id: 'BrokerID',
      count: 'ClientCount',
      name: 'RealName',
      rankByCount: 'RowNum'
    }
  ],
  rankByCount: 'myRank',
  countDistance: 'up',
  brokers: 'sum'
};
