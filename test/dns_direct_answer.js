var dns = require('native-dns');

module.exports = function (domain, ip, response){
  response.answer.push(dns.A({
    name: domain,
    address: ip,
    ttl: 600,
  }));
  response.send();
};
