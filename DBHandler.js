var mysql = require("mysql-wrapper");

var connection = mysql({
  host: "localhost",
  user: "",
  password: "",
  timezone: "US/Eastern",
  database: "test"
});
var connected = false;

function isConnected() {
  return connected;
}
function connect() {
  if (isConnected()) {
    //throw "Already connected to db!";
    return;
  }
  if (connection.connect && !isConnected()) {
    connection.connect();
  }
  //TODO: Check if successful
  connected = true;
}
function disconnect() {
  if (!isConnected()) {
    //throw "Already disconnected from db!";
    return;
  }
  if (connection.disconnect) {
    connection.disconnect();
  }
  //TODO: Check if successful
  connected = false;
}
//The callback comes in the form function callback(err, rows, fields)
function query(queryString, callback) {
/*
  if (isConnected()) {
    connection.query(queryString, callback);
  } else {
    connect();
    query(queryString, callback);
    //callback("Not connected!", null, null);
  }
*/
  connection.query(queryString, callback);
}

exports.isConnected = isConnected;
exports.connect = connect;
exports.disconnect = disconnect;
exports.query = query;
