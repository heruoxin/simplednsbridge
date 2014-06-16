var dns_query = require('./dns_query'),
fs = require('fs');

//read hosts
var hosts = [];
fs.readFile('../hosts', 'utf8', function (err,data) {
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
      dns_query.direct_answer(domain,
                              hosts[i],
                              response);
      return;
    }
  }
  dns_query.answer(domain,
                   { address: '114.114.114.114', port: 53, type: 'udp' },
                   response
                  );
};
//  dns_query.direct_answer(domain,
//                          '2.2.2.2',
//                          response
//                         );
//  dns_query.answer(domain,
//            { address: '114.114.114.114', port: 53, type: 'udp' },
//            response
//           );

