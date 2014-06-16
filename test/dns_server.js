var dns = require('native-dns');

var server = dns.createServer();


function answer_dns(domain, response, server_info){
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

server.on('request', function (request, response) {
  answer_dns(request.question[0].name,
             response,
             { address: '114.114.114.114', port: 53, type: 'udp' }
            );
});
server.on('error', function (err, buff, req, res) {
  console.log(err.stack);
});

server.serve(53);
