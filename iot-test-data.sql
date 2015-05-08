/*
File Encoding         : 65001

Date: 2015-05-02 10:57:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Records of Users
-- ----------------------------
INSERT INTO Users (name) VALUES ("HomeGuy47201");

-- ----------------------------
-- Records of Rooms
-- ----------------------------
INSERT INTO Rooms (name) VALUES ("Living Room");

INSERT INTO Rooms (name) VALUES ("Room 1");
INSERT INTO Rooms (name) VALUES ("Room 2");

-- ----------------------------
-- Records of Devices
-- ----------------------------
INSERT INTO Devices (name, mac, RoomID) VALUES ("LR-Device", "90A2DA0E96CA", (SELECT `ID` FROM Rooms WHERE Rooms.name="Living Room"));

INSERT INTO Devices (name, mac, RoomID) VALUES ("Device-1", "123456789012", (SELECT `ID` FROM Rooms WHERE Rooms.name="Room 1"));
INSERT INTO Devices (name, mac, RoomID) VALUES ("Device-2", "223456789012", (SELECT `ID` FROM Rooms WHERE Rooms.name="Room 1"));
INSERT INTO Devices (name, mac, RoomID) VALUES ("Device-3", "323456789012", (SELECT `ID` FROM Rooms WHERE Rooms.name="Room 1"));
INSERT INTO Devices (name, mac, RoomID) VALUES ("Device-4", "423456789012", (SELECT `ID` FROM Rooms WHERE Rooms.name="Room 2"));
INSERT INTO Devices (name, mac, RoomID) VALUES ("Device-5", "123456789012", (SELECT `ID` FROM Rooms WHERE Rooms.name="Room 2"));
INSERT INTO Devices (name, mac, RoomID) VALUES ("Device-6", "123456789012", (SELECT `ID` FROM Rooms WHERE Rooms.name="Room 2"));

-- ----------------------------
-- Records of Sensors
-- ----------------------------
INSERT INTO `Sensors` (type, DeviceID) VALUES ("temperature", (SELECT `ID` from Devices WHERE Devices.name="LR-Device"));
INSERT INTO `Sensors` (type, DeviceID) VALUES ("motion", (SELECT `ID` from Devices WHERE Devices.name="LR-Device"));
INSERT INTO `Sensors` (type, DeviceID) VALUES ("humidity", (SELECT `ID` from Devices WHERE Devices.name="LR-Device"));

INSERT INTO `Sensors` (type, DeviceID) VALUES ("light", (SELECT `ID` from Devices WHERE Devices.name="Device-1"));
INSERT INTO `Sensors` (type, DeviceID) VALUES ("temperature", (SELECT `ID` from Devices WHERE Devices.name="Device-2"));
INSERT INTO `Sensors` (type, DeviceID) VALUES ("motion", (SELECT `ID` from Devices WHERE Devices.name="Device-3"));

-- ----------------------------
-- Records of SensorData
-- ----------------------------
-- Device-1 light sensor test data
INSERT INTO `SensorData` (data, SensorID) VALUES("0.5", (SELECT `ID` from Sensors WHERE Sensors.DeviceID="Device-1" AND Sensors.type="light"));
INSERT INTO `SensorData` (data, SensorID) VALUES("0.51", (SELECT `ID` from Sensors WHERE Sensors.DeviceID="Device-1" AND Sensors.type="light"));
INSERT INTO `SensorData` (data, SensorID) VALUES("0.41", (SELECT `ID` from Sensors WHERE Sensors.DeviceID="Device-1" AND Sensors.type="light"));
INSERT INTO `SensorData` (data, SensorID) VALUES("0", (SELECT `ID` from Sensors WHERE Sensors.DeviceID="Device-1" AND Sensors.type="light"));
-- Device-2 temperature sensor test data
INSERT INTO `SensorData` (data, SensorID) VALUES("21", (SELECT `ID` from Sensors WHERE Sensors.DeviceID="Device-2" AND Sensors.type="temperature"));
