var dns = require('../node_modules/native-dns'),
util = require('util');

var question = dns.Question({
  name: 'youtube.com',
  type: 'A',
});

var start = Date.now();

var req = dns.Request({
  question: question,
  server: { address: '8.8.8.8', port: 53, type: 'tcp' },
  timeout: 1000,
});

req.on('timeout', function () {
  console.log('Timeout in making request');
});

req.on('message', function (err, answer) {
  answer.answer.forEach(function (a) {
    console.log(a.address);
  });
});

req.on('end', function () {
  var delta = (Date.now()) - start;
  console.log('Finished processing request: ' + delta.toString() + 'ms');
});

console.log(req);

req.send();
