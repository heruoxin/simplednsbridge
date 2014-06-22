var dns = require('native-dns');
var dig_query = require('./dig_query');

function answer(request, server_list, response){
  var has_answers = false, has_end = false;
  var end_num = 0;
  for (var i in server_list){
    dig_query(request, server_list[i], reply);
  }
  function reply(end_info, ans_info){

    if (end_info && !has_end){
      if (end_info !== "end"){console.error(end_info,ans_info);}
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



