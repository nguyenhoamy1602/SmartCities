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
      sensor.storeSensorData("1/1/2017", Math.round(Math.random() * 100));
      sensor.storeSensorData("1/1/2017", Math.round(Math.random() * 100));
      sensor.storeSensorData("1/1/2017", Math.round(Math.random() * 100));
      sensor.storeSensorData("1/1/2017", Math.round(Math.random() * 100));
      sensor.storeSensorData("1/1/2017", Math.round(Math.random() * 100));
    });
  });
  };
