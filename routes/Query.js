/* Query.js

  When the UI makes a request for db data, it will do so via the /query route.

  This route will interpret the query request, make a query to the db, and return a response in json.
*/
exports.route = {
  name: "UIQuery",
  protocol: "get",
  route: "/query",
  handler: queryHandler
};

var DBHandler = require("./../DBHandler.js");

function queryHandler(request, response) {
  //Talk to db
  //
  response.header("Content-Type", "application/json");
  //TODO: Disable CORS after testing!!!
  response.header("Access-Control-Allow-Origin", "*");
  response.writeHead(200);

  //TODO: Parse request for query string (in request.query)
  //console.log(request.query);
  var q = request.query;
  if (!q.type || !q.id) {
    return;
  }
  console.log("Retrieve info for ", q.id, " from type: ", q.type);
  var queryString = "";
  switch (q.type) {
    case "room":
      //retrieve a list of devices for the specified room
      queryString = 'SELECT * from Devices WHERE RoomID=(SELECT `ID` FROM Rooms WHERE Rooms.ID="'+q.id+'");';
      break;
    case "device":
      //retrieve a list of sensors for the specified device
      queryString = 'SELECT * from Sensors WHERE DeviceID=(SELECT `ID` FROM Devices WHERE Devices.ID="'+q.id+'");';
      break;
    case "sensor":
      //retrieve the sensor data for the specified sensor
      //we also cross join it with data from the Sensors table to get the sensor type
      //queryString = 'SELECT Sensors from SensorData WHERE SensorID=(SELECT `ID` FROM Sensors WHERE Sensors.ID="'+q.id+'");';
      queryString = 'select sensordata.data, sensordata.timestamp, sensors.type from sensordata cross join sensors where sensordata.sensorid="'+q.id+'" and sensordata.sensorid=sensors.id;';
      //Make sure to specify the table you are grabbing data from
      //queryString = 'select SensorData.data, SensorData.timestamp from SensorData where SensorData.SensorID="1";';
      break;
    default:
      //If unknown type, don't perform a query
      response.end(JSON.stringify({
        "err": "Error in query"
      }));
      return;
  }
  console.log("Query string:");
  console.log(queryString);
  //Make query to db and return the results in the callback
  if (!DBHandler.isConnected()) {
    DBHandler.connect();
  }
  DBHandler.query(queryString, function(err, rows, fields) {
    if (err) {
      response.end('{"err": "Error in query"}');
      DBHandler.disconnect();
      return;
    }

    //We want to parse the results into an acceptable format
    var result = {}, keys = [];
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      for (var key in row) {
        if (!result.hasOwnProperty(key)) {
          result[key] = [];
          keys.push(key); //saving this for later
        }
        result[key].push(row[key]);
      }
    }
var newresult = (function(results) {
  var objs = [], keys = [], l = 0;
  for (var key in results) {
    if (results.hasOwnProperty(key)) {
      keys.push(key);
      if (results[key].length > l) {
        l = results[key].length;
      }
    }
  }
  for (var i = 0; i < l; i++) {
    var obj = {};
    for (var j = 0; j < keys.length; j++) {
      var key = keys[j];
      obj[key] = results[key][i];
    }
    objs.push(obj);
  }
  return objs;
}(result));
/*
    result = (function(r) {
      if (!r.ID) {
        return r;
      }
      var l = r.ID.length, o = [];
      for (var i = 0; i < l; i++) {
        var rowObject = {};
        if (r.data) {
          rowObject["data"] = r["data"][i];
        }
        if (r.timestamp) {
          rowObject["timestamp"] = r["timestamp"][i];
        }
        if (r.type) {
          rowObject["type"] = r["type"][i];
        }
        for (var index = 0; index < keys.length; index++) {
          rowObject[keys[index]] = r[keys[index]][i];
        }
        o.push(rowObject);
      }
      //console.log(o);
      return o;
    }(result));
*/
    console.log(newresult[0]);
    //response.end(JSON.stringify(result));
    response.end(JSON.stringify(newresult));
  });
}
