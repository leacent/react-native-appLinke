var _ = require('lodash');

module.exports = _.assign(
  require('./application'),
  require('./city'),
  require('./broker'),
  require('./order'),
  require('./me'),
  require('./card'),
  require('./bill'),
  require('./bank'),
  require('./income')
);
