// call this with:   while sleep 1; do truffle exec sensorSimulator.js; done
module.exports = function (callback) {
    var Sensor = artifacts.require("./Sensor.sol");

    Sensor.deployed().then(function (instance) {
        var sensor;
        sensor = instance;
        sensor.storeSensorData("1/1/2017", Math.round(Math.random() * 100));
    });
}
