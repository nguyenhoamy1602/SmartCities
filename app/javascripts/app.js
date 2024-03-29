// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';

// Import our contract artifacts and turn them into usable abstractions.
import sensor_artifacts from '../../build/contracts/Sensor.json'
const Highcharts = require('highcharts');
require('highcharts/modules/boost')(Highcharts);
// MetaCoin is our usable abstraction, which we'll use through the code below.
const Sensor = contract(sensor_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var sensors;
var sensor;

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    Sensor.setProvider(web3.currentProvider);
    
    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your sensor data.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any sensor data! Make sure your Ethereum client is configured correctly.");
        return;
      }

      self.showData();
    });
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  showData: function() {
    var self = this;

    var meta;
    Sensor.deployed().then(function(instance) {
      meta = instance;
      return meta.readSensorData(0);
    }).then(function(value) {
      var timeRead = value[0];
      var dateRead = Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', timeRead);
      var valueRead = value[1];
      var time = document.getElementById("time");
      time.innerHTML = timeRead.valueOf();
      var date = document.getElementById("date");
      date.innerHTML = dateRead.valueOf();
      var measure = document.getElementById("measure");
      measure.innerHTML = valueRead.valueOf();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });
  },

  aggregateTheLastNthDay: function() {
    var self = this;

    var day = parseInt(document.getElementById("day").value);
    var month = parseInt(document.getElementById("month").value);
    var year = parseInt(document.getElementById("year").value);
    this.setStatus("Initiating calculation for " + day.toString() + " days " + month.toString() + " months " + year.toString() + " years (please wait)");
    //var sum=0;
    var meta;
    Sensor.deployed().then(function(instance) {
      meta = instance;
      return meta.sumNthElement(day + month*30 + year*365);
    }).then(function(value) {
      self.setStatus("There are " + value.toString() + " ppm emitted in the last " + day.toString() + " days " + month.toString() + " months " + year.toString() + " years!");
    })

  }


};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});

