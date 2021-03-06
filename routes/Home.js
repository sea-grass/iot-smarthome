var jade = require("jade");
var moment = require("moment");

var DBHandler = require("./../DBHandler.js");

exports.route = {
  name: "Home",
  protocol: "get",
  route: "/",
  handler: homeHandler
};

function homeHandler(request, response) {
  var data = {};
  //TODO: Query user data
  data.user = {
    "name": "HomeGuy47201",
    "lastLogin": "Yesterday's date"
  };
  //TODO: Query favourites data
  data.favourites = {
    "Weather (Indoor)": {
      "name": "indoor",
      "favId": "Fav 1",
      "data": "21 Celcius"
    },
    "Weather (Outdoor)": {
      "name": "outdoor",
      "favId": "Fav 2",
      "data": "11 Celcius"
    }
  };
  //TODO: Query room data
  data.rooms = {};
  DBHandler.connect();
  DBHandler.query("SELECT * FROM Rooms", function (err, rows, fields) {
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      data.rooms[row["ID"]] = row;
    }
    //Query device data
    data.devices = {};
    DBHandler.query("SELECT * FROM Devices", function (err, rows, fields) {
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        data.devices[row["ID"]] = row;
      }
      //Query sensor data
      data.sensors = {};
      DBHandler.query("SELECT * FROM Sensors", function (err, rows, fields) {
        for (var i = 0; i < rows.length; i++) {
          var row = rows[i];
          console.log(row);
          data.sensors[row["ID"]] = row;
        }
        console.log(data);
        var html = jade.renderFile("ui/index.jade", data);
        //console.log(html)
        response.writeHead(200);
        response.end(html);
      });
    });
  });
  
  
  /*var data = {
    "rooms": {
        "room-1": {
            "name": "Room 1"
        },
        "room-2": {
            "name": "Room 2"
        },
        "room-3": {
            "name": "Room 3"
        }
    },
    "devices": {
        "device-1": {
            "rid": "room-1",
            "name": "Device 01"
        },
        "device-2": {
            "rid": "room-1",
            "name": "Device 02"
        },
        "device-3": {
            "rid": "room-1",
            "name": "Device 03"
        },
        "device-4": {
            "rid": "room-2",
            "name": "Device 04"
        },
        "device-5": {
            "rid": "room-2",
            "name": "Device 05"
        },
        "device-6": {
            "rid": "room-2",
            "name": "Device 06"
        },
        "device-7": {
            "rid": "room-3",
            "name": "Device 07"
        },
        "device-8": {
            "rid": "room-3",
            "name": "Device 08"
        }
    },
    "sensors": {
        "sensor-1": {
            "did": "device-1",
            "name": "S001L",
            "type": "Light"
        },
        "sensor-2": {
            "did": "device-2",
            "name": "S002M",
            "type": "Motion"
        },
        "sensor-3": {
            "did": "device-3",
            "name": "S003TH",
            "type": "Temp/Humid"
        },
        "sensor-4": {
            "did": "device-4",
            "name": "S004C",
            "type": "CO2"
        },
        "sensor-5": {
            "did": "device-1",
            "name": "S005C",
            "type": "CO2"
        },
        "sensor-6": {
            "did": "device-1",
            "name": "S006L",
            "type": "Light"
        },
        "sensor-7": {
            "did": "device-2",
            "name": "S007M",
            "type": "Motion"
        },
        "sensor-8": {
            "did": "device-3",
            "name": "S008L",
            "type": "Light"
        },
        "sensor-9": {
            "did": "device-5",
            "name": "S009M",
            "type": "Motion"
        },
        "sensor-10": {
            "did": "device-6",
            "name": "S010M",
            "type": "Motion"
        },
        "sensor-11": {
            "did": "device-7",
            "name": "S011C",
            "type": "CO2"
        },
        "sensor-12": {
            "did": "device-8",
            "name": "S012TH",
            "type": "Temp/Humid"
        },
        "sensor-13": {
            "did": "device-5",
            "name": "S013L",
            "type": "Light"
        },
        "sensor-14": {
            "did": "device-5",
            "name": "S014C",
            "type": "CO2"
        },
        "sensor-15": {
            "did": "device-8",
            "name": "S015M",
            "type": "Motion"
        }
    },
    "sensor-data": {
        "light": {
            "sid": "S004C",
            "data": "2"
        }
    },
    date: moment().format("DD-MMM-YY, HH:mm:ss")
  };
  */
  
}
