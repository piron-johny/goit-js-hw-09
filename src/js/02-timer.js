import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
const daysElem = document.querySelector('.value[data-days]');
const hoursElem = document.querySelector('.value[data-hours]');
const minutesElem = document.querySelector('.value[data-minutes]');
const secondsElem = document.querySelector('.value[data-seconds]');

let difference = 0;
let countDown = null;
let finishTimeCount = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    finishTimeCount = selectedDates[0].getTime();
    startBtn.disabled = false;

    if (finishTimeCount < Date.now()) {
      startBtn.setAttribute('disabled', true);
      Notify.failure('You have chosen the past!');
    }
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', onStartCouter);

function onStartCouter() {
  countDown = setInterval(updateCountValue, 1000);
}

function updateCountValue() {
  const nowTime = new Date().getTime();
  difference = finishTimeCount - nowTime;

  if (difference < 0) {
    Notify.success('The time is up!');
    startBtn.setAttribute('disabled', true);
    clearInterval(countDown);
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(difference);

  daysElem.textContent = addLeadingZero(days);
  hoursElem.textContent = addLeadingZero(hours);
  minutesElem.textContent = addLeadingZero(minutes);
  secondsElem.textContent = addLeadingZero(seconds);
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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
