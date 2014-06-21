var dns = require('native-dns');
var dns_cache = require('../node_modules/native-dns/node_modules/native-dns-cache');


function answer(request, server_list, response){
  for (var i in server_list){
    each_answer(request, server_list[i], reply);
  }
  var limit_of_end_info_num = parseInt(server_list.length *3/4) || 1;
  var success_num = 0,
  all_end_num =0;
  function reply(ans_info, end_info){

    if (end_info){
      all_end_num += 1;
      if (end_info === "end"){success_num += 1;}
      if (success_num === limit_of_end_info_num || all_end_num === server_list.length){
        success_num = limit_of_end_info_num +1;
        all_end_num = server_list.length +1;
        console.log("Send!");
        response.send();
      }
    } else if (ans_info){
      if (success_num < limit_of_end_info_num || all_end_num < server_list.length){
        console.log("push info!");
        response.answer.push(ans_info);
      }
    }
  }
}


function each_answer(request, server_info, cb){
  var req = dns.Request({
    question: request.question[0],
    server: server_info,
    timeout: 1500,
    //try_edns: true,
    cache: false
  });

  req.on('message', function (err, answer) {
    console.log("a Message", server_info.address);
    answer.answer.forEach(function (a) {
      console.log(a.address);
      cb(a,null);
    });
  });

  req.on('end', function () {
    console.log("a End", server_info.address);
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



