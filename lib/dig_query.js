var exec = require('child_process').exec;

var server_type = {
  tcp: "tcp",
  udp: "notcp"
};
var dns_type = {
  A: 1,
  AAAA: 1,
  CNAME: 5
};
var dns_class = {
  IN: 1
};

function query(request, server_info, cb){
  var command = "dig "+request.question[0].name+" +noall +answer +time=2"+" +"+server_type[server_info.type]+" -p"+server_info.port+" @"+server_info.address;
  //var command = "dig "+"'"+request+"'"+" +noall +answer"+" +"+server_info.type+" -p"+server_info.port+" @"+server_info.address;
  exec(command, function(err, stdout, stderr){
    if (stderr){
      cb(stderr, null);
    } else {
      var answer_list = stdout.split('\n').slice(3,-1);
      for (var i in answer_list){
        var the_answer = answer_list[i].split(/\s+/);
        if (the_answer.length !== 5){return cb(answer_list[i], null);}
        ans_info = {
          name: the_answer[0].replace(/\.$/, ""),
          type: dns_type[(the_answer[3])],
          class: dns_class[(the_answer[2])],
          ttl: the_answer[1],
        };
        if (dns_type[the_answer[3]] === 1){
          ans_info.address = the_answer[4];
        } else {
          ans_info.data = the_answer[4];
        }
        cb(null,ans_info);
      }
      cb("end",null);
    }
  });
}

module.exports = query;

//query("mail.google.com",{ "address": "8.8.8.8", "port": 53, "type": "tcp" },console.log);
