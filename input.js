module.exports = function(callback) {

var Sensor = artifacts.require("./Sensor.sol");
var sensor;
Sensor.deployed().then(function(instance){sensor=instance;});
setInterval(function () {
sensor.storeSensorData((new Date()).getTime(), Math.round(Math.random() * 100));
}, 1000);
}
