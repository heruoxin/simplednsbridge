var dns_query = require('./dns_query');

module.exports = function (request, response){
  dns_query(request.question[0].name,
            response,
            { address: '114.114.114.114', port: 53, type: 'udp' }
           );
};
