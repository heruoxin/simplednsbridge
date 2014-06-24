var dns = require('native-dns');
var dig_query = require('./dig_query');
var datastore = require('./db_query');

function answer(request, server_list, response){
  var has_end = false, end_num = 0;
  var this_time_answers = [];
  datastore.query_db(request.question[0].name, function(in_cache, answers){
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
        //has answer OR all timeout.
        datastore.update_db(request.question[0].name, this_time_answers);
        if (!has_end){
          response.answer = this_time_answers;
          response.send();
          has_end = true;
        }
      }

    } else {
      //some answer comming.
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



