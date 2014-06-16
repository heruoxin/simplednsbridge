var dns_query_answer = require('./dns_query_answer'),
dns_direct_answer = require('./dns_direct_answer');

module.exports = function (request, response){
  var domain = request.question[0].name;
  dns_direct_answer(domain,
                    '123.123.123.123',
                    response);
//  dns_query_answer(domain,
//            response,
//            { address: '114.114.114.114', port: 53, type: 'udp' }
//           );
};
