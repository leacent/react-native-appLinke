var superagent = require('superagent');
var request = require('superagent-defaults')(superagent);

const host = 'http://127.0.0.1:8000';

request.on('request', function (req) {
  if (req.url[0] === '/') {
    req.url = host + req.url;
  }
  // 默认24秒超时
  req.timeout(req._timeout || (24 * 1000));
  // 请求地址加时间戳，以防缓存
  req.query({
    '__t': +(new Date())
  });
});

module.exports = request;
