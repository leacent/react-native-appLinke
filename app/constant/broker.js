var _ = require('lodash');
var km = require('keymirror');

module.exports = _.assign({

  BROKER_RANK_BY_TOTAL: 1,
  BROKER_RANK_BY_PERSON_COUNT: 0

}, km({

  // dispatcher :

  DEFAULT_BROKER_SUCCESS: null,
  DEFAULT_BROKER_ERROR: null,
  BROKER_LIST_SUCCESS: null,

  BROKER_RANK_LIST_SUCCESS: null,
  BROKER_RANK_LIST_ERROR: null
}));
