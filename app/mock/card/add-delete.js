/** 添加银行卡
* uri: /Member/InsertBank
* method: post
* data: {
*    userKey:13544193956
*    bankName:ff069dbaf3b34265b7381a63ad5318ea
*    city:山西省,晋城市
*    subbranch:方法
*    bankCode:622222222222222244
* }
*/
exports.add = {
  "status": "true",
  "msg": "添加成功",
  "Isfirst": "0",
  "data": "55efa02e29e44"
};

/**
 * 解绑银行卡
 * uri: /Member/DeleteBank
 * method: post
 * data: {
 *   key: id
 * }
 */

exports.delete = {
  "success": true,
  "message": "解绑成功",
  "data": null,
  "timeStamp": "1441250861"
};
