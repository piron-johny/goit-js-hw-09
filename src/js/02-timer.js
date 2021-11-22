import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
const daysElem = document.querySelector('.value[data-days]');
const hoursElem = document.querySelector('.value[data-hours]');
const minutesElem = document.querySelector('.value[data-minutes]');
const secondsElem = document.querySelector('.value[data-seconds]');

let difference = 0;
let countDown = null;
let finishTimeCount;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    finishTimeCount = selectedDates[0].getTime();
    console.log(selectedDates[0].getTime());
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', onStartCouter);

function onStartCouter() {
  countDown = setInterval(updateCountValue, 1000);
}

function updateCountValue() {
  const nowTime = new Date().getTime();
  difference = (finishTimeCount - nowTime);
  if (difference < 0) {
    clearInterval(countDown);
    console.log('FINISH');
  };

  console.log(difference);

  daysElem.textContent = convertMs(difference).days;
  hoursElem.textContent = convertMs(difference).hours;
  minutesElem.textContent = convertMs(difference).minutes;
  secondsElem.textContent = convertMs(difference).seconds;

}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
