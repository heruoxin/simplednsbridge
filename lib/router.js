var dns_query = require('../lib/dns_query'),
fs = require('fs');
var config = require('../config');

//read hosts
var hosts = [];
fs.readFile(__dirname + '/../hosts', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  data = data.split('\n');
  for (var i in data){
    if (data[i] !== ''){
      hosts_line = data[i].split(/\s+/);
      hosts[hosts_line[1]] = hosts_line[0];
    }
  }
});


module.exports = function (request, response){
  var domain = request.question[0].name;

  //in hosts?
  for (var i in hosts){
    if (domain.match(new RegExp(i))!==null){
      dns_query.direct_answer(request,
                              hosts[i],
                              response);
      return;
    }
  }

  //query
  for (var j in config){
    if (domain.match(new RegExp(j))!==null){
      console.log(domain, j);
      dns_query.answer(request,
                       config[j],
                       response
                      );
      return;
    }
  }
};

//  dns_query.answer(domain,
//                   { address: '114.114.114.114', port: 53, type: 'udp' },
//                   response
//                  );
//  dns_query.direct_answer(domain,
//                          '2.2.2.2',
//                          response
//                         );
//  dns_query.answer(domain,
//            { address: '114.114.114.114', port: 53, type: 'udp' },
//            response
//           );

