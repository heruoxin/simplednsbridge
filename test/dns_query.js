var dns = require('native-dns');

module.exports = function (domain, response, server_info){
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
};

