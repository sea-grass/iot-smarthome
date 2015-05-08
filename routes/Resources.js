exports.route = {
  name: "Resources",
  protocol: "get",
  route: "/:name",
  handler: resourceHandler
};

function resourceHandler(request, response) {
  var options = {
    root: __dirname + '/../ui/',
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
}
