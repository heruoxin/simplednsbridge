var exec = require('child_process').exec;

db = {};

exports.init_db = function() {
  var db = {};
};

exports.query_db = function(domain, cb){
  if (!db[domain]){
    //console.log("Not in cache");
    cb("no cache",null);
  }
  else {
    //console.log("In cache");
    //notice: too many answers whill crash the native-dns module!
    cb(null, db[domain].slice(0,10));
  }
};

exports.update_db = function(domain, answers){
  db[domain] = answers;

};

exports.show_db = function() {
  console.log(db);
};

