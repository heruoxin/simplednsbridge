var fs = require('fs');

//read ../hosts
module.exports = function (){
  fs.readFile('../hosts', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var hosts = [];
    data = data.split('\n');
    for (var i in data){
      if (data[i] !== ''){
        hosts_line = data[i].split(/\s+/);
        hosts[hosts_line[1]] = hosts_line[0];
      }
    }
    return hosts;
  });
};

