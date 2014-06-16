#!/usr/bin/env node

var simplednsproxy = require('../lib/dns_server');

simplednsproxy(function(err){
  if (err){console.error(err);}
});
