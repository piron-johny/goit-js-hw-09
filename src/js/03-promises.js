import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name=delay]');
const step = document.querySelector('input[name=step]');
const amount = document.querySelector('input[name=amount]');
const submitBtn = form.querySelector('button');

let stepTimer = null;
let counterPromise = 0;
let delayCount = 0;

form.addEventListener('submit', e => {
  e.preventDefault();
});

submitBtn.addEventListener('click', onClickSubmit);

function onClickSubmit(e) {
  stepTimer = setInterval(() => {
    counterPromise += 1;

    delayCount += +step.value

    if (counterPromise === 1) {
      delayCount = +delayInput.value;
    }

    if (counterPromise === +amount.value) {
      clearInterval(stepTimer);
    }

    console.log('count', counterPromise);
    console.log('del', delayCount);

    createPromise(counterPromise, delayCount)
      .then(({ position, delay }) => {

        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }, step.value);

  counterPromise = 0;
  delayCount = 0;
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
