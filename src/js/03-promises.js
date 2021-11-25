const form = document.querySelector('.form');
const delay = document.querySelector('input[name=delay]');
const step = document.querySelector('input[name=step]');
const amount = document.querySelector('input[name=amount]');
const submitBtn = form.querySelector('button');
const stepTimer = null;
const promises = [];

let counterPromise = 0;

form.addEventListener('submit', e => {
  e.preventDefault();
});

submitBtn.addEventListener('click', onClickSubmit);

function onClickSubmit(e) {

  setTimeout(() => {
    clearInterval(stepTimer)
  }, (step.value * amount.value));

  stepTimer = setInterval(() => {
    console.log(counterPromise);
    counterPromise += 1
    promises.push('promise' + counterPromise);

    // createPromise(amount.value, delay.value)
    //   .then(({ position, delay }) => {
    //     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    //   })
    //   .catch(({ position, delay }) => {
    //     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    //   });
  }, step.value);

  console.log(promises);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
