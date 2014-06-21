var dns = require('native-dns');
dns.platform.cache = false;


function answer(request, server_list, response){
  var has_answers = false, has_end = false;
  var end_num = 0;
  for (var i in server_list){
    each_answer(request, server_list[i], reply);
  }
  function reply(ans_info, end_info){

    if (end_info && !has_end){
      end_num += 1;
      if (has_answers || end_num >= server_list.length){
        has_end = true;
        response.send();
      }

    } else if (ans_info && !has_end){
      has_answers = true;
      response.answer.push(ans_info);
    }
  }
}


function each_answer(request, server_info, cb){
  var req = dns.Request({
    question: request.question[0],
    server: server_info,
    //timeout: 1500,
    //try_edns: true,
  });

  req.on('message', function (err, answer) {
    answer.answer.forEach(function (a) {
      cb(a,null);
    });
  });

  req.on('end', function () {
    cb(null, "end");
  });
  // req.on('timeout', function () {
  //   console.log("a Timeout", server_info.address);
  //   cb(null, "timeout");
  // });

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



