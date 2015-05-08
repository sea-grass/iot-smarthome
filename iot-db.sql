/*
File Encoding         : 65001

Date: 2015-05-02 10:57:21
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for Users
-- ----------------------------
DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for UserLog
-- ----------------------------
DROP TABLE IF EXISTS `UserLog`;
CREATE TABLE `UserLog` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `UserID` int,
  FOREIGN KEY (`UserID`) REFERENCES Users(`ID`),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for Rooms
-- ----------------------------
DROP TABLE IF EXISTS `Rooms`;
CREATE TABLE `Rooms` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for Devices
-- ----------------------------
DROP TABLE IF EXISTS `Devices`;
CREATE TABLE `Devices` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  `mac` VARCHAR(12),
  `RoomID` int,
  FOREIGN KEY (`RoomID`) REFERENCES Rooms(`ID`),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for Sensors
-- ----------------------------
DROP TABLE IF EXISTS `Sensors`;
CREATE TABLE `Sensors` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(255),
  `DeviceID` int,
  FOREIGN KEY (`DeviceID`) REFERENCES Devices(`ID`),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for SensorData
-- ----------------------------
DROP TABLE IF EXISTS `SensorData`;
CREATE TABLE `SensorData` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `data` VARCHAR(255),
  `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `SensorID` int,
  FOREIGN KEY (`SensorID`) REFERENCES Sensors(`ID`),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
