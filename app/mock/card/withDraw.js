
/** 获取提现卡
* uri: /Member/GetWithdrawalsData
* method: post
* data: {}
*/
exports.get = {
  "success": true,
  "message": "获取成功",
  "data": {
    "rowId": "55e7bb6617103d1acc6211f2",
    "bankName": "建设银行",
    "bankCode": "6222222222222222333",
    "txSum": 90.00,
    "txzSum": 0.00
  },
  "timeStamp": "1441250222"
};

/** 设置体现卡
* uri: /Member/UpdateBank
* method: post
* data: {
*   key: id
* }
*/
exports.set = {
  "status": "true",
  "msg": "绑定成功"
};
