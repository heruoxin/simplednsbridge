#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2)),
    simplednsproxy = require('../lib/dns_server');

simplednsproxy(function(err,log){
  if (err){console.error(err, log);}
  else {console.log(log);}
});
