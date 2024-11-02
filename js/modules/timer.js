function timer(id, deadline) {
  function calcTimeDifference(deadline) {
    const difference = Date.parse(deadline) - new Date();
    let days, hours, minutes, seconds;

    if (difference <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(difference / (24 * 60 * 60 * 1000));
      hours = Math.floor((difference / (60 * 60 * 1000)) % 24);
      minutes = Math.floor((difference / (60 * 1000)) % 60);
      seconds = Math.floor((difference / 1000) % 60);
    }
    return {
      difference,
      days,
      hours,
      minutes,
      seconds,
    };
    // 24 часа * 60 минут * 60 секунд * 1000 мс
  }

  function addZero(n) {
    return n < 10 ? `0${n}` : n;
  }

  function setTimer(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timerInterval = setInterval(changeTime, 1000);

    changeTime();

    function changeTime() {
      const timeDif = calcTimeDifference(endtime);
      days.textContent = addZero(timeDif.days);
      hours.textContent = addZero(timeDif.hours);
      minutes.textContent = addZero(timeDif.minutes);
      seconds.textContent = addZero(timeDif.seconds);
      // console.log('interval');
      if (timeDif.difference <= 0) {
        clearInterval(timerInterval);
      }
    }
  }

  setTimer(id, deadline);
}

export default timer;
