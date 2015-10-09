
exports.basic = {
  id: 'userID',
  name: 'userName',
  lastLogin: 'lastTime|timestamp',
  fund: {
    balance: 'withdraw',
    income: 'history',
    withdrawDoing: 'freeze'
  },
  isAuth: 'isRealName|bool'
};

exports.income = {
  id: 'brokerageID',
  type: 'brokerageType',
  dealAt: 'brokerageTime',
  amount: 'brokerageMoney',
  descripe: 'brokerageDescription'
};

exports.recommend = {
  total: 'dealMoney',
  totalCount: 'totalCount',
  dealCount: 'dealCount'
};
// '/Account/GetPersonalDetailInfo
exports.detail = {
  phone: 'Mobile',
  name: 'RealName',
  email: 'VisibleEmail',
  securityEamil: 'Email',
  identityId: 'IDNumber',
  selfIntroduc: 'Description',
  company: 'CompanyId',
  lastLogin: 'LastVisit'
};
