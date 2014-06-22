var exec = require('child_process').exec;

var server_type = {
  tcp: "tcp",
  udp: "notcp"
};
var dns_type = {
  A: 1,
  CNAME: 5
};
var dns_class = {
  IN: 1
};

function query(request, server_info, cb){
  var command = "dig "+request.question[0].name+" +noall +answer"+" +"+server_type[server_info.type]+" -p"+server_info.port+" @"+server_info.address;
  //var command = "dig "+"'"+request+"'"+" +noall +answer"+" +"+server_info.type+" -p"+server_info.port+" @"+server_info.address;
  console.log(command);
  exec(command, function(err, stdout, stderr){
    if (stderr){
      cb(stderr, null);
    } else {
      var answer_list = stdout.split('\n').slice(3,-1);
      for (var i in answer_list){
        var the_answer = answer_list[i].split(/\s+/);
        ans_info = {
          name: the_answer[0].replace(/\.$/, ""),
          type: dns_type[(the_answer[3])],
          class: dns_class[(the_answer[2])],
          ttl: the_answer[1],
        };
        if (the_answer[3] === "A" || the_answer[3] === "AAA"){
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
