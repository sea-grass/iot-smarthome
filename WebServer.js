#!/usr/local/bin/node

var express = require('express');
var bodyParser = require("body-parser");
var moment = require('moment');

var app = express();
app.use(bodyParser.json());

//Get the routes from the modules
var routes = [];
routes.push( require("./routes/Home.js").route );
routes.push( require("./routes/Query.js").route );
routes.push( require("./routes/Device.js").route );
//Resource route needs to be added last, because it redirects all unmatched /* requests to /ui/*, for assets
routes.push( require("./routes/Resources.js").route );

for (var i = 0; i < routes.length; i++) {
  var route = routes[i];
  console.log(route);
  if (route.protocol) {
    switch (route.protocol.toUpperCase()) {
      case "GET":
        app.get(route.route, route.handler);
        break;
      case "POST":
        app.post(route.route, route.handler);
        break;
      default:
        app.get(route.route, route.handler);
        break;
    }
  } else {
    //no protocol assigned, assume GET
    console.log("No protocol specified for " + route.name + ", so assuming GET");
    app.get(route.route, route.handler);
  }
  app.get(route.route, route.handler);
}

app.listen(3000);
console.log('Server started on Port 3000');
