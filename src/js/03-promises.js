import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const form = document.querySelector('.form');
const delay = document.querySelector('input[name=delay]');
const step = document.querySelector('input[name=step]');
const amount = document.querySelector('input[name=amount]');
const submitBtn = form.querySelector('button');

let stepTimer = null;
let counterPromise = 0;

form.addEventListener('submit', e => {
  e.preventDefault();
});

submitBtn.addEventListener('click', onClickSubmit);

function onClickSubmit(e) {
  stepTimer = setInterval(() => {
    counterPromise += 1;

    if (counterPromise === +amount.value) {
      clearInterval(stepTimer);
    }

    createPromise(counterPromise, delay.value)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }, step.value);
}

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
