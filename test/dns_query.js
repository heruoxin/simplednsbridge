var dns = require('native-dns');

function answer(domain, server_info, response){
  var question = dns.Question({
    name: domain,
    //type: 'A',
    //type: 'CNAME',
  });
  var req = dns.Request({
    question: question,
    server: server_info,
    timeout: 1000,
  });

  req.on('message', function (err, answer) {
    console.log(err);
    console.log(answer);
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

function direct_answer (domain, ip, response){
  response.answer.push(dns.A({
    name: domain,
    address: ip,
    ttl: 600,
  }));
  response.send();
}

exports.direct_answer = direct_answer;
exports.answer = answer;
