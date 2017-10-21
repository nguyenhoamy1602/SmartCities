var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var Sensor = artifacts.require("./Sensor.sol");

module.exports = function (deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(Sensor, "123,111", "1").then(function (instance) {

    Sensor.deployed().then(function (instance) {
      var sensor = instance;
      sensor.storeSensorData((new Date()).getTime(), Math.round(Math.random() * 100));
      console.log((new Date()).getTime());
      sensor.storeSensorData((new Date()).getTime(), Math.round(Math.random() * 100));
      sensor.storeSensorData((new Date()).getTime(), Math.round(Math.random() * 100));
      sensor.storeSensorData((new Date()).getTime(), Math.round(Math.random() * 100));
      sensor.storeSensorData((new Date()).getTime(), Math.round(Math.random() * 100));
    });
  });
  };
