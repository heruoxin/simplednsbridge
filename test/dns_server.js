var dns = require('native-dns'),
dns_query = require('./dns_query');

var server = dns.createServer();


server.on('request', function (request, response) {
  dns_query(request.question[0].name,
            response,
            { address: '114.114.114.114', port: 53, type: 'udp' }
           );
});
server.on('error', function (err, buff, req, res) {
  console.log(err.stack);
});

server.serve(53);
