var Sensor = artifacts.require("./Sensor.sol");

contract('Sensor tests', function (accounts) {
    it("should store and retrive 2 values", async () => {
        var sensor = await Sensor.new("110,48", 1);
        await sensor.storeSensorData("1/1/2017", 10);
        await sensor.storeSensorData("2/1/2017", 20);

        var lastValue = await sensor.readSensorData(0);
        assert.equal(lastValue[1], 20, "wrong value");

        var lastValue = await sensor.readSensorData(1);
        assert.equal(lastValue[1], 10, "wrong value");
    });
});
