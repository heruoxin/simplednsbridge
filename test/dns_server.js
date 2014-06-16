var dns = require('native-dns');
var router = require('./router');

var server = dns.createServer();

server.on('request', router);
server.on('error', function (err, buff, req, res) {
  console.log(err.stack);
});

server.serve(53);
