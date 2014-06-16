var dns = require('native-dns');
var router = require('../lib/router');

var server = dns.createServer();

module.exports = function (cb){
  server.on('request', router);
  server.on('error', function (err, buff, req, res) {
    cb(err.stack);
  });

  server.serve(53);
};
