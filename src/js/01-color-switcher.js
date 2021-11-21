const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

btnStart.addEventListener('click', onGenColorBg);
btnStop.addEventListener('click', onStopColorBg);

let timerFunc;

function onGenColorBg() {
  getTimer();
  btnStart.setAttribute('disabled', true);
}

function onStopColorBg() {
  stopTimer();
  btnStart.disabled = false;
}

// -------

function getTimer() {
  timerFunc = setInterval(addFunctionOfTimer, 1000);
}

function stopTimer() {
  clearInterval(timerFunc);
}

function addFunctionOfTimer() {
  document.body.style.background = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
