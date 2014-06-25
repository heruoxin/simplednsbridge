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
    cb(null, db[domain]);
  }
};

exports.update_db = function(domain, answers){
  //notice: more than 22 answers whill crash the native-dns module!
  //db[domain] = answers.slice(0,22);
  sort_db(domain, answers.slice(0,22));

};

exports.show_db = function() {
  console.log(db);
};

sort_db = function(domain, answers){
  for (var a in answers){
    for (var b=0;b<a;b+=1){
      if (answers[a].name === answers[b].name && (answers[a].data === answers[b].data || answers[a].address === answers[b].address)) {
        answers.splice(a, 1);
      }
    }
  }
  db[domain] = answers;
};

