var request = require('../utils/superagent');
var cardAdaptor = require('../entity/card');
var nprogress = require('../utils/nprogress');
var CONSTANT = require('../constant');
var muder = require('../utils/muder');
var note = require('../utils/note');
var _ = require('lodash');

module.exports = {
  // 获取我的银行卡列表
  getList: function() {
    var self = this;
    nprogress.start();
    request
      .post('/Member/GetUserBankList')
      .send({
      })
      .end(function(err, res) {
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.CARD_LIST_ERROR, '网络错误');
        }
        if (res.body.success) {
          return self.dispatch(CONSTANT.CARD_LIST_SUCCESS, _.map(res.body.data.list, function(card) {
            return muder(card, cardAdaptor.cardList);
          }));
        }
        return self.dispatch(CONSTANT.CARD_LIST_ERROR, res.body.message || '获取银行卡列表失败');
      });
  },
  // 获取提现卡
  getWithdraw: function() {
    var self = this;
    nprogress.start();
    request
      .post('/Finance/GetWithdrawalsData')
      .send({})
      .end(function(err, res) {
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.CARD_GET_WITHDRAW_ERROR, '网络错误');
        }
        if (res.body.success) {
          return self.dispatch(CONSTANT.CARD_GET_WITHDRAW_SUCCESS, {
            card: muder(res.body.data, cardAdaptor.withdrawCard)
          });
        }
        if (res.body.success === false && _.get(res.body.data,'txSum')) {
          return self.dispatch(CONSTANT.CARD_GET_WITHDRAW_SUCCESS, {
            card: {}
          });
        }
        return self.dispatch(CONSTANT.CARD_GET_WITHDRAW_ERROR, res.body.message || '获取提现卡失败');
      });
  },
  // 添加卡
  add: function(opts) {
    var self = this, card = opts.card;
    nprogress.start();
    self.dispatch(CONSTANT.CARD_ADD_START);

    request
      .post('/Member/AppendBankCard')
      .send({
        bankID: card.bank.id,
        city: card.address,
        subBranch: card.bank.branch,
        cardNumber: card.cardNum,
        realName: opts.name,
        ID: opts.id
      })
      .end(function(err, res) {
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.CARD_ADD_ERROR, '网络错误');
        }
        if (res.body.success) {
          return self.dispatch(CONSTANT.CARD_ADD_SUCCESS, _.assign(card, {
            id: res.body.data
          }));
        }
        return self.dispatch(CONSTANT.CARD_ADD_ERROR, res.body.message || '添加银行卡失败');
      });
  },
  // 删除／解绑卡
  delete: function(cardId,callback) {
    var self = this;
    nprogress.start();
    request
      .post('/Member/DeleteBank')
      .send({
        key: cardId
      })
      .end(function(err, res) {
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.CARD_DELETE_ERROR, '网络错误');
        }
        if (res.body.success) {
          note.flash('解绑成功');
          (callback||function(){})();
          return self.dispatch(CONSTANT.CARD_DELETE_SUCCESS, cardId);
        }
        note.flash(res.body.message||'解绑失败');
        return self.dispatch(CONSTANT.CARD_DELETE_ERROR, res.body.message || '解绑银行卡失败');
      });
  },
  // 设为提现卡
  setWithdraw: function(cardId) {
    var self = this;
    nprogress.start();
    request
      .post('/Member/UpdateBank')
      .send({
        userBankCardsId: cardId
      })
      .end(function(err, res) {
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.CARD_SET_WITHDRAW_ERROR, '网络错误');
        }
        if (res.body.success) {
          note.flash('绑定成功');
          return self.dispatch(CONSTANT.CARD_SET_WITHDRAW_SUCCESS, cardId);
        }
        return self.dispatch(CONSTANT.CARD_SET_WITHDRAW_ERROR, res.body.message || '设为提现卡失败');
      });
  }

};
