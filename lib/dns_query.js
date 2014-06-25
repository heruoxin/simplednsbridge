var dns = require('native-dns');
var dig_query = require('./dig_query');
var memory_db = require('./db_operate');

function answer(request, server_list, response){
  var domain = request.question[0].name;
  var has_end = false, end_num = 0;
  var this_time_answers = [];
  memory_db.query_db(domain, function(in_cache, answers){
    if (!in_cache){
      //in cache!
      response.answer = answers;
      response.send();
      has_end = true;
    }
    for (var i in server_list){
      dig_query(request, server_list[i], get_dig_reply);
    }
  });

  function get_dig_reply(end_info, ans_info){

    if (end_info){
      //some server end.
      if (end_info !== "end"){console.error(end_info,ans_info);} //dig reply some errors such as "connection timed out"
      end_num += 1;
      if (this_time_answers.length || end_num >= server_list.length){
        //has answer OR all end.
        memory_db.update_db(domain, this_time_answers);
        if (!has_end){
          response.answer = this_time_answers;
          response.send();
          has_end = true;
        }
      }

    } else {
      //some answer comming.

      //check the ans_info is legaltive
      if (!(ans_info.name && ans_info.type && ans_info.class && ans_info.ttl && (ans_info.address || ans_info.data))){
        return;
      }
      //check the ans_info is already existed
      for (var i in this_time_answers){
        if (ans_info.name === this_time_answers[i].name){
          if (ans_info.data){
            if (ans_info.data === this_time_answers[i].data){
              return;
            }
          } else {
            if (ans_info.address === this_time_answers[i].address){
              return;
            }
          }
        }
      }
      this_time_answers.push(ans_info);
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



