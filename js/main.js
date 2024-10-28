// window.addEventListener('DOMContentLoaded', () => { });

/* - - - - - - - - - - - - - - Tabs - - - - - - - - - - - - - - */

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

const DEADLINE = '2024-10-30';

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

/* - - - - - - - - - - - - - - Modal - - - - - - - - - - - - - - */

const modal = document.querySelector('.modal'),
  modalOpenButtons = document.querySelectorAll('[data-modal]');

modalOpenButtons.forEach((btn) => {
  btn.addEventListener('click', openModal);
});

function closeModal() {
  modal.classList.add('hidden');
  document.body.style.overflow = '';
  console.log('close');
}

modal.addEventListener('click', (event) => {
  if (event.target.matches('.modal') || event.target.matches('[data-close]')) {
    closeModal();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

function openModal() {
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  // clearInterval(openModalTimeoutId);
}

// const openModalTimeoutId = setTimeout(openModal, 4000);

window.addEventListener('scroll', showModalByScroll);

function showModalByScroll() {
  const page = document.documentElement;
  if (page.scrollTop + page.clientHeight >= page.scrollHeight) {
    openModal();
    window.removeEventListener('scroll', showModalByScroll);
  }
}

/* - - - - - - - - - - - - - - Cards - - - - - - - - - - - - - - */

class Card {
  constructor(src, alt, title, desc, price, parentSelector, ...classes) {
    this.imageSource = src;
    this.alt = alt;
    this.title = title;
    this.desc = desc;
    this.price = price;
    this.classes = classes;
    this.transfer = 27;
    this.changeToUAH(); // вызвали существующий метод
  }
  changeToUAH() {
    this.price *= this.transfer;
  }

  render() {
    const div = document.createElement('div');
    if (this.classes.length) {
      this.classes.forEach((className) => {
        div.classList.add(className);
      });
    } else {
      div.classList.add('menu__item');
    }
    div.innerHTML = `
          <img src=${this.imageSource} alt=${this.alt} />
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">
            ${this.desc}
          </div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>
    `;
    document.querySelector('.menu__field .container').append(div);
  }
}

// const getResource = async (url) => {
//   const req = await fetch(url);
//   if (!req.ok) {
//     throw new Error(`Could not fetch ${url}, status: ${res.status}`);
//   }
//   return await req.json();
// };
// getResource('http://localhost:3000/menu').then((data) => {
//   data.forEach(({ img, altimg, title, descr, price }) => {
//     new Card(img, altimg, title, descr, price).render();
//   });
// });

axios.get('http://localhost:3000/menu').then((response) => {
  response.data.forEach(({ img, altimg, title, descr, price }) => {
    new Card(img, altimg, title, descr, price).render();
  });
});

/* 
getResource('http://localhost:3000/menu').then((data) => createCards(data));
function createCards(data) {
  data.forEach(({ img, altimg, title, descr, price }) => {
    const element = document.createElement('div');
    element.classList.add('menu__item');
    element.innerHTML = `
          <img src=${img} alt=${altimg} />
          <h3 class="menu__item-subtitle">${title}</h3>
          <div class="menu__item-descr">
            ${descr}
          </div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${
              price * 40
            }</span> грн/день</div>
          </div>
    `;
    document.querySelector('.menu__field .container').append(element);
  });
}
 */
/* - - - - - - - - - - - - - - Form - - - - - - - - - - - - - - */

const forms = document.querySelectorAll('form');
const message = {
  loading: './img/form/spinner.svg',
  success: 'Скоро мы с вами свяжемся.',
  failure: 'Что-то пошло не так',
};

/* function postData(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const statusMessage = document.createElement('div');
    statusMessage.textContent = message.loading;
    form.append(statusMessage);

    const request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    const formData = new FormData(form); // получим объект с данными из формы, которую передаем как аргумент
    // У input, textarea, option - ВСЕГДА ДОЛЖЕН БЫТЬ УКАЗАН АТРИБУТ name. Иначе FormData не найдет этот инпут

    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    request.send(JSON.stringify(object));

    request.addEventListener('load', () => {
      if (request.status === 200) {
        console.log(request.response);
        statusMessage.textContent = message.success;
        form.reset();
        setTimeout(() => {
          statusMessage.remove();
        }, 2000);
      } else {
        statusMessage.textContent = message.failure;
      }
    });
  });
}

forms.forEach((form) => {
  postData(form);
}); */

const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: data,
  });
  return await res.json(); // т.к. не знаем сколько времени
  // понадобится чтобы перевести в обычный объект
};

function bindPostData(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const spinner = document.createElement('img');
    spinner.src = message.loading;
    spinner.classList.add('centered');
    form.after(spinner);

    const formData = new FormData(form);

    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    postData('http://localhost:3000/requests', json)
      .then((data) => {
        // data - те данные, что возвращаются из промиса т.е. ответ от сервера.
        console.log(data);
        showThanksModal(message.success);
        spinner.remove();
      })
      .catch(() => {
        showThanksModal(message.failure);
      })
      .finally(() => {
        form.reset();
      });
  });
}

forms.forEach((form) => {
  bindPostData(form);
});

function showThanksModal(message) {
  const previousModalDialog = document.querySelector('.modal__dialog');
  previousModalDialog.classList.add('hidden');
  openModal();
  const thanksModal = document.createElement('div');
  thanksModal.classList.add('modal__dialog');
  thanksModal.innerHTML = `
  <div class="modal__content">
  <div class="modal__close" data-close="">×</div>
    <div class="modal__title">
      ${message}
    </div>
  </div>
  `;
  document.querySelector('.modal').append(thanksModal);

  setTimeout(() => {
    thanksModal.remove();
    previousModalDialog.classList.remove('hidden');
    closeModal();
  }, 5000);
}

fetch('http://localhost:3000/menu')
  .then((data) => data.json())
  .then((res) => console.log(res));

/* - - - - - - - - - - - - - - Slider (Carousel) - - - - - - - - - - - - - - */

const slides = document.querySelectorAll('.offer__slide'),
  slider = document.querySelector('.offer__slider'),
  showCurrentSlide = document.querySelector('span#current'),
  showTotalSlides = document.querySelector('#total'),
  prevButton = document.querySelector('.offer__slider-prev'),
  nextButton = document.querySelector('.offer__slider-next'),
  slidesWrapper = document.querySelector('.offer__slider-wrapper'),
  slidesField = document.querySelector('.offer__slider-inner'),
  sliderWidth = slidesWrapper.offsetWidth;

let currentSlide = 1,
  offset = 0;

slidesField.style.width = `${100 * slides.length}%`;

showTotalSlides.textContent = addZero(slides.length);
showCurrentSlide.textContent = addZero(currentSlide);

slides.forEach((slide) => {
  slide.style.width = `${sliderWidth}px`;
});
slider.style.position = 'relative';

const indicators = document.createElement('ol'),
  dots = [];
indicators.classList.add('carousel-indicators');
slider.append(indicators);

for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement('li');
  dot.classList.add('dot');
  dot.setAttribute('data-slide-to', i + 1);
  indicators.append(dot);
  dots.push(dot);
  dots[0].classList.add('dot--active');
}

indicators.addEventListener('click', (event) => {
  const target = event.target;
  if (target && target.matches('li.dot')) {
    offset = (target.getAttribute('data-slide-to') - 1) * sliderWidth;
    slidesField.style.transform = `translateX(-${offset}px)`;
    currentSlide = target.getAttribute('data-slide-to');
    showSliderIndicators(currentSlide);
  }
});

prevButton.addEventListener('click', () => {
  if (offset == 0) {
    offset = sliderWidth * (slides.length - 1);
  } else {
    offset -= sliderWidth;
  }
  slidesField.style.transform = `translateX(-${offset}px)`;
  if (currentSlide == 1) {
    currentSlide = slides.length;
  } else {
    currentSlide--;
  }
  showSliderIndicators(currentSlide);
});

nextButton.addEventListener('click', () => {
  if (offset >= sliderWidth * (slides.length - 1)) {
    offset = 0;
  } else {
    offset += sliderWidth;
  }
  slidesField.style.transform = `translateX(-${offset}px)`;
  if (currentSlide >= slides.length) {
    currentSlide = 1;
  } else {
    currentSlide++;
  }
  showSliderIndicators(currentSlide);
});

function showSliderIndicators(slide) {
  showCurrentSlide.textContent = addZero(slide);
  dots.forEach((dot) => dot.classList.remove('dot--active'));
  dots[slide - 1].classList.add('dot--active');
}

/* - - - - - Простая реализация
 showSlide(currentSlide);
if (slides.length < 10) {
  showTotalSlides.textContent = `0${slides.length}`;
} else {
  showTotalSlides.textContent = `${slides.length}`;
}

function showSlide(index) {
  if (index < 1) {
    currentSlide = slides.length;
  }
  if (index > slides.length) {
    currentSlide = 1;
  }

  slides.forEach((item) => {
    item.classList.add('hidden');
  });

  showCurrentSlide.textContent = addZero(currentSlide);
  slides[currentSlide - 1].classList.remove('hidden');
}

prevButton.addEventListener('click', () => {
  showSlide(--currentSlide);
});
nextButton.addEventListener('click', () => {
  showSlide(++currentSlide);
});
 */
