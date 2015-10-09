var _ = require('lodash');

module.exports = _.assign(
  require('./city/api'),
  require('./broker/api'),
  require('./order/api'),
  require('./card/api'),
  require('./bill/api'),
  require('./bank/api'),
  require('./me/api'),
  require('./income/api'),
  require('./validator/api')
);
