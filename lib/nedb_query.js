
exports.init_db = function() {
  var db = {};
};

exports.query_db = function(domain, cb){
  if (!db[domain]){cb("no cache",null);}
  else {cb(null, db[domain]);}
};

exports.update_db = function(domain, answers){
  db[domain] = answers;
};
