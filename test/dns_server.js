var dns = require('native-dns');

var server = dns.createServer();

server.on('request', function (request, response) {

  var domain = request.question[0].name;
  var question = dns.Question({
    name: domain,
    type: 'A',
  });
  var req = dns.Request({
    question: question,
    server: { address: '114.114.114.114', port: 53, type: 'udp' },
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

});

server.on('error', function (err, buff, req, res) {
  console.log(err.stack);
});

server.serve(53);
