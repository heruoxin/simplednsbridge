db = {};

exports.init_db = function() {
  var db = {};
};

exports.query_db = function(domain, cb){
  if (!db[domain]){
    console.log("Not in cache");
    cb("no cache",null);
  }
  else {
    console.log("In cache");
    cb(null, db[domain]);
  }
};

exports.update_db = function(domain, answers){
  db[domain] = answers;
};
