var DBHandler = require("./../DBHandler.js");

exports.route = {
  name: "Device",
  protocol: "post",
  route: "/device",
  handler: deviceHandler
};

/*
  Expect:
    query = {
      mode: (pair|send),
      mac: (the device's mac address),
      type: (the type of data)/(light|temperature|humidity, etc...),
      data: (the data string to store in the db)
    }
*/
function deviceHandler(request, response) {
  var query, params
      responseBody = "";
  params = request.query;
  query = {
    "mode": params.mode ? params.mode : null,
    "mac": params.mac ? params.mac : null,
    "type": params.type ? params.type : null,
    "data": params.data ? params.data : null
  };
  console.log(query);
  switch (query.mode) {
    case "pair":
      //TODO: Device pairing sequence
      //add the device's identity to the db
      //from the db's response, generate a response for the device
      responseBody += "Finished device pairing sequence";
      break;
    case "send":
      if (!query.mac || !query.type || !query.data) {
        return;
      }
      var queryString = 'INSERT INTO `SensorData` (data, SensorID) VALUES ("'+query.data+'", (SELECT `ID` from Sensors WHERE Sensors.DeviceID=(SELECT `ID` FROM Devices WHERE Devices.mac="'+query.mac+'") AND Sensors.type="'+query.type+'"));';
      console.log(queryString);
      DBHandler.query(queryString, function (err, rows, fields) {
        if (err) {
          console.log("Error: ", err);
        } else {
          console.log("Data inserted successfully");
        }
        response.writeHead(200);
        response.end(responseBody);
      });
      //the device has been paired and is sending data
      //verify the device's identity
      //send the data to the db
      //from the db's response, generate a response for the device
      break;
  }
}
