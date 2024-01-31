import RobotWindow from 'https://cyberbotics.com/wwi/R2023b/RobotWindow.js';

window.robotWindow = new RobotWindow();
const benchmarkName = 'Humanoid Marathon';
let distance = 0.0;

const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick); 

window.robotWindow.receive = function(message, robot) {
  if (message.startsWith('run:')) {
    const values = message.split(':');
    distance = parseFloat(values[1]);
    const battery = parseFloat(values[2]);
    document.getElementById('distance-display').innerHTML = distance.toFixed(3);
    document.getElementById('battery-display').innerHTML = battery.toFixed(2);
  } else if (message === 'stop') {
    if (typeof sendBenchmarkRecord === 'undefined' || !sendBenchmarkRecord(robot, this, benchmarkName, distance, metricToString)) {
      document.getElementById('distance-display').style.color = 'red';
      document.getElementById('battery-display').style.color = 'red';
    }
  } else if (message.startsWith('stop')) {
    const values = message.split(':');
    const distance = parseFloat(values[1]);
    const battery = parseFloat(values[2]);
    document.getElementById('distance-display').innerHTML = distance.toFixed(3);
    document.getElementById('battery-display').innerHTML = battery.toFixed(2);
    document.getElementById('distance-display').style.color = 'green';
    document.getElementById('distance-display').style.fontWeight = 'bold';
    document.getElementById('battery-display').style.color = 'green';
    document.getElementById('battery-display').style.fontWeight = 'bold';
    document.querySelector(".text").innerHTML = `
      <h2>${benchmarkName} complete</h2>
      <h3>Congratulations you finished the benchmark!</h3>
      <p>Your current performance is: <b style="color:green;">${metricToString(distance)}</b></p>
      <p>If you want to submit your controller to the leaderboard, follow the instructions given by the "Register" button on the benchmark page.</p>
    `
    toggleModal()
  } else
    console.log("Received unknown message for robot '" + robot + "': '" + message + "'");

  function metricToString(s) {
    return parseFloat(s).toFixed(3) + ' m';
  }
};
