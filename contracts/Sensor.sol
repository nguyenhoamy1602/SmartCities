pragma solidity ^0.4.2;

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract Sensor {
	struct DateTime {
        uint16 year;
        uint8 month;
        uint8 day;
        uint8 hour;
        uint8 minute;
        uint8 second;
        uint8 weekday;
	}

	struct Reading {
		string time;
		uint value;
	}

	uint id;
	Reading[] sensorData;
	string location;



	function Sensor(string _location, uint _id) {
		id = _id;
		location = _location;
	}

	function storeSensorData(string _time, uint _value) {
		sensorData.push(Reading(_time, _value));
	}

	function readSensorData(uint _x) constant returns(string, uint) {
		uint lastElement = sensorData.length - 1;
		return (sensorData[lastElement - _x].time, sensorData[lastElement - _x].value);
	}


}
