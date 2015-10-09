exports.inDetail = {
  id: 'rowId',
  status: {
    code: 'status|num',
    msg: 'statusName'
  },
  createAt: 'time|timestamp',
  dealAt: 'responstime|timestamp',
  user: {
    name: 'userName',
    phone: 'phone'
  },
  extra: {
    remark: 'overReason',
    reason: 'overRemarks'
  },
  city: 'city'
};

exports.inRecommendList = {
  id: 'orderID',
  status: {
    code: 'orderMark|num',
    msg: 'orderState'
  },
  createAt: 'orderTime|timestamp',
  user: {
    name: 'userName',
    phone: 'phone'
  }
};
