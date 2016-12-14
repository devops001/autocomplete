
var Database = require('./db');

var Controller = {

  handleRequest: function(req, res) {
    var partial = req.params.partial;
    if (!partial || partial.length < 1) {
      res.json({"status":"notok", "msg":"missing partial"});
    }

    var query   = {"name":new RegExp(partial +".*")};
    var fields  = {};
    var options = {"limit":10};

    Database.find(query, fields, options, function(err, result) {
      if (err) {
        res.status(500);
        res.json(err);
      } else {
        res.status(200);
        res.json(result);
      }
    });
  }

};

module.exports = Controller;
