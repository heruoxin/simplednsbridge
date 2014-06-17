var dns = require('native-dns');

function answer(request, server_list, response){
  for (var i in server_list){
    each_answer(request, server_list[i], response);
  }
}

function each_answer(request, server_info, response){
  //var question = dns.Question({
    //name: domain,
    //type: 'A',
    //type: 'CNAME',
  //});
  var req = dns.Request({
    question: request.question[0],
    server: server_info,
    timeout: 1000,
    //cache: false
  });

  req.on('message', function (err, answer) {
    answer.answer.forEach(function (a) {
      response.answer.push(a);
    });
  });

  req.on('end', function () {
    response.send();
  });
  req.on('timeout', function () {
    response.send();
  });

  req.send();
}

function direct_answer (request, ip, response){
  response.answer.push(dns.A({
    name: request.question[0].name,
    address: ip,
    ttl: 600,
  }));
  response.send();
}

exports.direct_answer = direct_answer;
exports.answer = answer;



