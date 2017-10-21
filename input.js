module.exports = function(callback) {
import sensor_artifacts from '../../build/contracts/Sensor.json'
const Sensor = contract(sensor_artifacts);
var sensor;
Sensor.deployed().then(function(instance){sensor=instance;});
setInterval(function () {
sensor.storeSensorData((new Date()).getTime(), Math.round(Math.random() * 100));
}, 1000);
}
