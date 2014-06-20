var dns = require('native-dns');

function answer(request, server_list, response){
  for (var i in server_list){
    each_answer(request, server_list[i], reply);
  }
  var limit_of_end_info_num = parseInt(server_list.length *2/3) || 1;
  var end_num = 0;
  function reply(ans_info, end_info){
    if (end_info){
      end_num += 1;
      if (end_num == limit_of_end_info_num){
        response.send();
      }
    } else if (ans_info){
      if (end_num < limit_of_end_info_num){
        response.answer.push(ans_info);
      }
    }
  }
}


function each_answer(request, server_info, cb){
  //var question = dns.Question({
  //name: domain,
  //type: 'A',
  //type: 'CNAME',
  //});
  var req = dns.Request({
    question: request.question[0],
    server: server_info,
    timeout: 1000,
    //cache: false
  });

  req.on('message', function (err, answer) {
    answer.answer.forEach(function (a) {
      cb(a,null);
    });
  });

  req.on('end', function () {
    cb(null, "end");
  });
  req.on('timeout', function () {
    cb(null, "timeout");
  });

  req.send();
}

function direct_answer (request, ip, response){
  response.answer.push(dns.A({
    name: request.question[0].name,
    address: ip,
    ttl: 600,
  }));
  response.send();
}

exports.direct_answer = direct_answer;
exports.answer = answer;



