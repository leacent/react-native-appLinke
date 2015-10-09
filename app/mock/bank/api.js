var list = require('./list');

module.exports = {
  'POST /Member/GetBankList': function (req, res) {
    return res.json(list.list);
  }
};
