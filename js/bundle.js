/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
  const result = document.querySelector('.calculating__result span');
  let sex = localStorage.getItem('sex'),
    height,
    weight,
    age,
    ratio = localStorage.getItem('ratio');

  function initCalculator(selector, activeClass) {
    document.querySelectorAll(selector).forEach((item) => {
      if (
        (localStorage.getItem('sex') &&
          item.getAttribute('id') == localStorage.getItem('sex')) ||
        (localStorage.getItem('ratio') &&
          item.getAttribute('data-ratio') == localStorage.getItem('ratio'))
      ) {
        item.classList.add(activeClass);
      }
    });
  }

  initCalculator('#gender div', 'calculating__choose-item_active');
  initCalculator(
    '.calculating__choose_big div',
    'calculating__choose-item_active'
  );

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____';
      return;
    }

    if (sex === 'female') {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  function getStaticInforation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.addEventListener('click', () => {
        if (elem.getAttribute('data-ratio')) {
          ratio = elem.getAttribute('data-ratio');
          localStorage.setItem('ratio', elem.getAttribute('data-ratio'));
        } else {
          sex = elem.getAttribute('id');
          localStorage.setItem('sex', elem.getAttribute('id'));
        }
        console.log(ratio, sex);

        elements.forEach((item) => {
          item.classList.remove(activeClass);
        });
        elem.classList.add(activeClass);
        calcTotal();
      });
    });
  }
  getStaticInforation(
    '.calculating__choose#gender div',
    'calculating__choose-item_active'
  );
  getStaticInforation(
    '.calculating__choose_big div',
    'calculating__choose-item_active'
  );

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          showInvalidInputBorder(input);
          break;
        case 'weight':
          weight = +input.value;
          showInvalidInputBorder(input);
          break;
        case 'age':
          age = +input.value;
          showInvalidInputBorder(input);
          break;
      }
      calcTotal();
    });
  }
  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');

  function showInvalidInputBorder(element) {
    if (isNaN(+element.value)) {
      element.style.border = '1px solid red';
    } else {
      element.style.border = 'none';
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, openModalTimerId) {
  const forms = document.querySelectorAll(formSelector);
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

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const spinner = document.createElement('img');
      spinner.src = message.loading;
      spinner.classList.add('centered');
      form.after(spinner);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
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
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', openModalTimerId);
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
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    }, 5000);
  }

  fetch('http://localhost:3000/menu')
    .then((data) => data.json())
    .then((res) => console.log(res));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector) {
  document.querySelector(modalSelector).classList.add('hidden');
  document.body.style.overflow = '';
  console.log('close');
}

function openModal(modalSelector, modalTimerId) {
  document.querySelector(modalSelector).classList.remove('hidden');
  console.log(modalTimerId);

  document.body.style.overflow = 'hidden';
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector),
    modalOpenButtons = document.querySelectorAll(triggerSelector);

  modalOpenButtons.forEach((btn) => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });

  modal.addEventListener('click', (event) => {
    if (
      event.target.matches('.modal') ||
      event.target.matches('[data-close]')
    ) {
      closeModal(modalSelector);
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal(modalSelector);
    }
  });

  window.addEventListener('scroll', showModalByScroll);

  function showModalByScroll() {
    const page = document.documentElement;
    if (page.scrollTop + page.clientHeight >= page.scrollHeight) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    showCurrentSlide = document.querySelector('span#current'),
    showTotalSlides = document.querySelector(totalCounter),
    prevButton = document.querySelector(prevArrow),
    nextButton = document.querySelector(nextArrow),
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

  function addZero(n) {
    return n < 10 ? `0${n}` : n;
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  activeClass
) {
  const tabHeaderWrapper = document.querySelector(tabsParentSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsHeader = document.querySelectorAll(tabsSelector);

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add('hidden');
      item.classList.remove('fade');
    });
    tabsHeader.forEach((tab) => {
      tab.classList.remove(activeClass);
    });
  }
  function showTabContent(index = 1) {
    tabsContent[index].classList.remove('hidden');
    tabsContent[index].classList.add('fade');
    tabsHeader[index].classList.add(activeClass);
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
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




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");










window.addEventListener('DOMContentLoaded', () => {
  const openModalTimeoutId = setTimeout(
    () => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', openModalTimeoutId),
    400000
  );
  (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])('form', openModalTimeoutId);
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', openModalTimeoutId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
    container: '.offer__slider',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    slide: '.offer__slide',
    totalCounter: '#total',
    currentCounter: 'span#current',
    wrapper: '.offer__slider-wrapper',
    slidesField: '.offer__slider-inner',
  });
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])(
    '.tabheader__item',
    '.tabcontent',
    '.tabheader__items',
    'tabheader__item_active'
  );
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2024-11-30');
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map