const request = require('../utils/superagent');
const CONSTANT = require('../constant/');
// const objectPath = require('object-path');
const orderAdaptor = require('../entity/order');
// const meAdaptor = require('../entity/me');
const muder = require('../utils/muder');
// const nprogress = require('../utils/nprogress');
const moment = require('moment');
const _ = require('lodash');
module.exports = {
  createBorrowOrder: function(opts) {
    var self = this;
    nprogress.start();
    request
      .post('/Order/BorrowMoney')
      .send({
        cityID: opts.cityId,
        brokerID: opts.brokerId
      })
      .end(function(err, res) {
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.ORDER_CREATE_BORROW_ERROR, '网络错误');
        }
        if (res.body.success === true) {
          var order = res.body.data;
          return self.dispatch(CONSTANT.ORDER_CREATE_BORROW_SUCCESS, {
            id: order.OrdersId,
            status: {
              code: CONSTANT.ORDER_APPLY_SUCCESS,
              msg: '交单成功'
            },
            createAt: +moment().format('x'),
            phone: order.Mobile || '',
            user: {
              name: order.FullName || ''
            }
          });
        }
        return self.dispatch(CONSTANT.ORDER_CREATE_BORROW_ERROR, res.body
          .message || '借款失败');
      });
  },
  createRecommendOrder: function(opts) {
    var self = this;
    nprogress.start();
    self.dispatch(CONSTANT.ORDER_CREATE_RECOMMEND_START);
    request
      .post('/Order/SubmitOrder')
      .send({
        cityID: opts.city.id,
        borrowerName: opts.name,
        borrowerPhone: opts.phone,
        clientKnowBroker: opts.isAnonymity ? 1 : 0
      })
      .end(function(err, res) {
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.ORDER_CREATE_RECOMMEND_ERROR,
            '网络错误');
        }
        if (res.body.success) {
          var order = res.body.data;
          return self.dispatch(CONSTANT.ORDER_CREATE_RECOMMEND_SUCCESS, {
            id: order.OrdersId,
            status: {
              code: CONSTANT.ORDER_APPLY,
              msg: '交单成功'
            },
            createAt: +moment().format('x'),
            user: {
              name: order.FullName || '',
              phone: order.Mobile || '',
            },
            city: opts.city.cityName
          });
        }
        return self.dispatch(CONSTANT.ORDER_CREATE_RECOMMEND_ERROR, res.body
          .message || '推荐失败');
      });
  },
  getOrder: function(id, type) {
    var self = this;
    nprogress.start();
    request
      .post('/Order/GetOrderByID')
      .send({
        orderID: id
      })
      .end(function(err, res) {
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.ORDER_GET_ERROR, '网络错误');
        }
        if (res.body.success === true) {
          return self.dispatch(CONSTANT.ORDER_GET_SUCCESS, {
            type: type,
            order: muder(res.body.data, orderAdaptor.inDetail)
          });
        }
        return self.dispatch(CONSTANT.ORDER_GET_ERROR, res.body.message ||
          '获取订单失败');
      });
  },
  getBorrowingList: function(userKey) {
    var self = this;
    nprogress.start();
    request
      .post('/Member/GetMyLoan')
      .send({
        userKey: userKey
      })
      .end(function(err, res) {
        nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.ORDER_BORROWING_LIST_ERROR,
            '网络错误');
        }
        if (res.body.status === '1') {
          return self.dispatch(CONSTANT.ORDER_BORROWING_LIST_SUCCESS, _.map(
            res.body.data,
            function(borrowOrder) {
              return muder(borrowOrder, orderAdaptor.inDetail);
            }));
        }
      });
  },
  getRecommendList: function() {
    var self = this;
    // nprogress.start();
    request
      .post('/Order/GetPersonalRecommend')
      .send({
        type: 0
      })
      .end(function(err, res) {
        // nprogress.done();
        if (err) {
          return self.dispatch(CONSTANT.ORDER_RECOMMEND_LIST_ERROR,
            '网络错误');
        }
        if (res.body.success) {
          return self.dispatch(CONSTANT.ORDER_RECOMMEND_LIST_SUCCESS, _.map(
            _.flatten(_.pluck(res.body.data, 'orders')),
            function(order) {
              return muder(order, orderAdaptor.inRecommendList);
            }));
        }
      });
  }
};
