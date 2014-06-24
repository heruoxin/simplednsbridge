#!/usr/bin/env node

var exec = require('child_process').exec;
var simplednsbridge = require('../lib/dns_server');

exec("whoami ", function(err, stdout, stderr){
  if (stdout.indexOf("root")){
    console.warn("Warning: Can't bind 53 port without ROOT permission");
  }
});


console.log(new Date().toLocaleString(), "Server Start");
simplednsbridge(function(err){
  if (err){console.error(err);}
});
