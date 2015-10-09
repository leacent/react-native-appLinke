var phone = require('./phone');

module.exports = {
  "POST /Account/CheckPhone": function(req, res){
    return res.json(phone.exist);
  }
};
