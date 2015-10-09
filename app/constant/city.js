var _ = require('lodash');
var km = require('keymirror');

module.exports = _.assign({

  // ghost number :
  DEFAULT_CITY: {
    id: '0d863130-209d-11e5-94f5-02004c4f4f50',
    cityName: '合肥'
  }
}, km({

  // dispatcher :

  CITY_LIST_SUCCESS: null,
  PROVINCE_LIST_SUCCESS: null
}));
