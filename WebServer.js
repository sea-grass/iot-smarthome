#!/usr/local/bin/node

var express = require('express');
var jade = require('jade');
var moment = require('moment');

var app = express();

app.get('/', function(request, response) {


  var html = jade.renderFile("ui/index.jade",{
    user:{
      name:'HomeGuy47201'
    },
    date: moment().format('DD-MMM-YY, HH:mm:ss')
  });
  console.log(html)
  response.writeHead(200);
  response.end(html);
});
/* route for resources */
app.get('/:name', function(request, response) {
  var options = {
    root: __dirname + '/ui/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  var fileName = request.params.name;
  response.sendFile(fileName, options, function(err) {
    if(err) {
      console.log(err);
      response.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
});
app.listen(3000);
console.log('Server started on Port 3000');

