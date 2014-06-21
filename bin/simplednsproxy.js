#!/usr/bin/env node

var exec = require('child_process').exec;
var simplednsproxy = require('../lib/dns_server');

exec("whoami ", function(err, stdout, stderr){
  if (stdout != root){
    console.warn("Warning: Can't bind 53 port without ROOT permission");
  }
});


simplednsproxy(function(err){
  if (err){console.error(err);}
});
