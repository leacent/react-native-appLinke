var objectPath = require('object-path');

var localCache = function () {
  this._init();
  return this;
};

localCache.prototype = {
  _init: function () {
    this.cache = {};
    return this;
  },
  set: function (key, value) {
      if (!key || !key.split('.')[0]) {
        console.log('error: can not set cache without a key');
        return this.cache;
      }
    objectPath.set(this.cache, key, value);
    return this.cache;
  },
  get: function (key) {
    return objectPath.get(this.cache, key) || '';
  }
};

var LCache = window.LCache = new localCache();
module.exports = LCache;
