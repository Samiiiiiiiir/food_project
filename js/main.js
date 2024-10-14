// window.addEventListener('DOMContentLoaded', () => { });

const tabHeaderWrapper = document.querySelector('.tabheader__items'),
  tabsContent = document.querySelectorAll('.tabcontent'),
  tabsHeader = document.querySelectorAll('.tabheader__item');

/* tabHeaderWrapper.addEventListener('click', (event) => {
  const target = event.target;
  if (target && target.matches('div.tabheader__item')) {
    tabsHeader.forEach((item, i) => {
      if (item === target) {
        hideTabs();
        showTab(i);
      }
    });
  }
});

function hideTabs() {
  tabsContent.forEach((item) => {
    item.classList.add('hidden');
    item.classList.remove('fade');
  });
  tabsHeader.forEach((item) => {
    item.classList.remove('tabheader__item_active');
  });
}

function showTab(index = 2) {
  tabsContent[index].classList.remove('hidden');
  tabsContent[index].classList.add('fade');
  tabsHeader[index].classList.add('tabheader__item_active');
}

hideTabs();
showTab(); */

/* - - - - - - - - - - - - - - Tabs - - - - - - - - - - - - - - */
function hideTabContent() {
  tabsContent.forEach((item) => {
    item.classList.add('hidden');
    item.classList.remove('fade');
  });
  tabsHeader.forEach((tab) => {
    tab.classList.remove('tabheader__item_active');
  });
}
function showTabContent(index = 1) {
  tabsContent[index].classList.remove('hidden');
  tabsContent[index].classList.add('fade');
  tabsHeader[index].classList.add('tabheader__item_active');
}

hideTabContent();
showTabContent();

tabHeaderWrapper.addEventListener('click', (event) => {
  const target = event.target;
  if (target && target.matches('div.tabheader__item')) {
    tabsHeader.forEach((item, i) => {
      if (item === target) {
        hideTabContent();
        showTabContent(i);
      }
    });
  }
});

/* - - - - - - - - - - - - - - Timer - - - - - - - - - - - - - - */

const DEADLINE = '2024-10-20';

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
    console.log('interval');
    if (timeDif.difference <= 0) {
      clearInterval(timerInterval);
    }
  }
}

setTimer('.timer', DEADLINE);

/* const DEADLINE = '2024-10-10';

function calcTimeDifference(endtime) {
  const dif = Date.parse(endtime) - new Date().getTime();
  let days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0;

  if (dif > 0) {
    days = Math.floor(dif / (24 * 60 * 60 * 1000));
    hours = Math.floor((dif / (60 * 60 * 1000)) % 24);
    minutes = Math.floor((dif / (60 * 1000)) % 60);
    seconds = Math.floor((dif / 1000) % 60);
  }
  return {
    total: dif,
    days,
    hours,
    minutes,
    seconds,
  };
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
    interval = setInterval(changeTime, 1000);

  function changeTime() {
    const t = calcTimeDifference(endtime);
    days.textContent = addZero(t.days);
    hours.textContent = addZero(t.hours);
    minutes.textContent = addZero(t.minutes);
    seconds.textContent = addZero(t.seconds);
    console.log('interval');
    if (t.total < 0) {
      clearInterval(interval);
    }
  }
}

setTimer('.timer', DEADLINE); */
