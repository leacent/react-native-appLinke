/**
* uri: /Member/GetUserBankList
* method: post
* data: {
*  userKey: 'userId' 
* }
*/
exports.list = {
  "status": "1",
  "msg": "获取成功",
  "data": [{
    "rowId": "55e7ba2c17103d1acc6211f1",
    "cardNumber": "6222222222222222",
    "mark": "0",
    "bank": "820867b526124a139bd282541473de14",
    "bankName": "交通银行",
    "imgurl": "/Content/images/bank_icon/bank_jt_*.png"
  }, {
    "rowId": "55e7bb6617103d1acc6211f2",
    "cardNumber": "6222222222222222333",
    "mark": "1",
    "bank": "ff069dbaf3b34265b7381a63ad5318ea",
    "bankName": "建设银行",
    "imgurl": "/Content/images/bank_icon/bank_jh_*.png"
  }, {
    "rowId": "55e7bb8a17103d1acc6211f3",
    "cardNumber": "622222222222222244",
    "mark": "0",
    "bank": "0346f9fb34334a6b930262644514a69f",
    "bankName": "工商银行",
    "imgurl": "/Content/images/bank_icon/bank_gh_*.png"
  }]
}