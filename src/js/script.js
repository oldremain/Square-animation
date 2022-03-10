const square = document.querySelector('.square'),
  btnStart = document.getElementById('start-btn'),
  btnReset = document.getElementById('reset-btn');

btnStart.addEventListener('click', () => {
  animate({
    duration: 2000,
    timing: bounceEaseOut,
    draw: function (progress) {
      square.style.left = progress * 439 + 'px';
      square.style.top = progress * 439 + 'px';
    },
  });
  console.log(square);
});

btnReset.addEventListener('click', () => {
  square.style.left = '';
  square.style.top = '';
});

const bounceEaseOut = makeEaseOut(bounce);

function makeEaseOut(timing) {
  return function (timeFraction) {
    return 1 - timing(1 - timeFraction);
  };
}

function bounce(timeFraction) {
  for (let a = 0, b = 1; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return (
        -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
      );
    }
  }
}

function animate({ duration, timing, draw }) {
  let start = performance.now();

  requestAnimationFrame(function animate(timestamp) {
    let timeFraction = (timestamp - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // let progress = timing(timeFraction);

    let progress = bounceEaseOut(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

//Простенькая анимация
// let start = null;

// function squareSlide(timestamp) {
//   if (!start) start = performance.now();

//   let progress = (timestamp - start) / 5000;

//   if (progress > 1) progress = 1;

//   square.style.left = progress * 439 + 'px';
//   square.style.top = progress * 439 + 'px';

//   if (progress < 1) {
//     requestAnimationFrame(squareSlide);
//   }
// }

// btnStart.addEventListener('click', () => {
//   requestAnimationFrame(squareSlide);
//   console.log(square);
// });

// btnReset.addEventListener('click', () => {
//   square.style.left = '';
//   square.style.top = '';
//   start = null;
// });
