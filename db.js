
var mongo = require('mongodb').MongoClient;

var Database = {
  state: { db:null, mode:null },

  connect: function(dbURI, callback) {
    if (Database.state.db) { return callback(); }
    mongo.connect(dbURI, function(err, db) {
      if (err) { return callback(err); }
      Database.state.db = db;
      callback();
    });
  },

  get: function() {
    return Database.state.db;
  },

  disconnect: function(callback) {
    if (Database.state.db) {
      Database.state.db.close(function(err, result) {
        Database.state.db   = null;
        Database.state.mode = null;
        callback(err);
      });
    }
  },

  find: function(query, fields, options, callback) {
    console.log("Database.find called with query:");
    console.log(query);
    var collection = Database.get().collection('conf_rooms');
    collection.find(query, fields, options).toArray(function(err, result) {
      if (result && result.length == 1) {
        console.log("query result length: "+ result.length);
        callback(err, result[0]);
      } else {
        callback(err, result);
      }
    });
  }

};

module.exports = Database;
