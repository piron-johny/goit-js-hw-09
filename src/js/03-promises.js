const form = document.querySelector('.form');
const delay = document.querySelector('input[name=delay]');
const step = document.querySelector('input[name=step]');
const amount = document.querySelector('input[name=amount]');
const submitBtn = form.querySelector('button');
let stepTimer = null;
const promises = [];

let counterPromise = 0;

form.addEventListener('submit', e => {
  e.preventDefault();
});

submitBtn.addEventListener('click', onClickSubmit);

function onClickSubmit(e) {
  console.log('amount', +amount.value);

  stepTimer = setInterval(() => {
    counterPromise += 1;
    console.log(counterPromise);
    if (counterPromise === +amount.value) {
      clearInterval(stepTimer);
      console.log('STOP!');
    }
    createPromise(counterPromise, delay.value);
    // createPromise(counterPromise, delay.value)
    //   .then(({ position, delay }) => {
    //     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    //   })
    //   .catch(({ position, delay }) => {
    //     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    //   });
  }, step.value);
}


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    resolve({ position, delay });
  } else {
    // Reject
    reject("Error! Error passed to reject function");
  }
}
