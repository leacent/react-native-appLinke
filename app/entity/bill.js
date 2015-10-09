exports.list = {
  id: 'UserWithdrawApplicationId',
  status: 'BrokerageMark',
  user: {
    id: 'UserId'
  },
  amount: 'WithdrawMoney',
  fee: 'WithdrawMoneyFee',
  remark: 'WithdrawMessage',
  card: {
    cardNum: 'WithdrawCardNumber',
    bank: {
      name: 'WithdrawBank'
    }
  },
  BrokerageMark: 'BrokerageMark',
  BrokerageRemark: 'BrokerageRemark',
  createAt: 'CreateDate|timestamp'
};
