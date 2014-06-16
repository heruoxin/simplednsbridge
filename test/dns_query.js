var dns = require('native-dns');

function answer(domain, server_info, response){
  var question = dns.Question({
    name: domain,
    type: 'A',
  });
  var req = dns.Request({
    question: question,
    server: server_info,
    timeout: 1000,
  });

  req.on('message', function (err, answer) {
    answer.answer.forEach(function (a) {
      response.answer.push(dns.A({
        name: domain,
        address: a.address,
        ttl: 600,
      }));
    });
  });

  req.on('end', function () {
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
