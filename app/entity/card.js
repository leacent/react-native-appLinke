//  获取用户银行卡列表
exports.cardList = {
  id: 'UserBankCardsId',
  cardNum: 'CardNumber',
  isforWithdraw: 'WithdrawalsMark|bool',
  bank: {
    id: 'BankId',
    name: 'BankName',
    icon: 'Imgurl'
  }
};

// 获取提现卡
exports.withdrawCard = {
  id: 'rowId',
  cardNum: 'bankCode',
  isforWithdraw: true,
  bank: {
    name: 'bankName'
  }
};
