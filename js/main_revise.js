window.addEventListener('DOMContentLoaded', () => {
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - tabs
  const tabHeaderWrapper = document.querySelector('.tabheader__items'),
    tabHeaderItems = document.querySelectorAll('.tabheader__item'),
    tabContentItems = document.querySelectorAll('.tabcontent');

  tabHeaderWrapper.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.matches('.tabheader__item')) {
      tabHeaderItems.forEach((item, i) => {
        if (item === target) {
          hideTabs(tabContentItems, tabHeaderItems);
          showTab(tabContentItems, tabHeaderItems, i);
        }
      });
    }
  });

  function hideTabs(tabContent, tabHeader) {
    tabContent.forEach((tab) => {
      tab.classList.add('hidden');
      tab.classList.remove('fade');
    });
    tabHeader.forEach((item) => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTab(tabContent, tabHeader, index = 2) {
    tabContent[index].classList.remove('hidden');
    tabContent[index].classList.add('fade');
    tabHeader[index].classList.add('tabheader__item_active');
  }

  hideTabs(tabContentItems, tabHeaderItems);
  showTab(tabContentItems, tabHeaderItems);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - cards
  class Card {
    constructor(src, alt, title, desc, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.desc = desc;
      this.price = price;
      this.parentSelector = parentSelector;
      this.transfer = 40;
      this.classes = classes;
      this.changeToUAH();
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
        <img src=${this.src} alt=${this.alt}>
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
      document.querySelector(this.parentSelector).append(div);
    }
  }

  new Card(
    'img/tabs/vegy.jpg',
    'vegy',
    'Меню "Фитнес"',
    `Меню "Фитнес" - это новый подход к приготовлению блюд: больше
    свежих овощей и фруктов. Продукт активных и здоровых людей. Это
    абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
    '10',
    '.menu__field .container',
    'menu__item',
    'class1',
    'class2'
  ).render();
  new Card(
    'img/tabs/elite.jpg',
    'elite',
    'Меню “Премиум”',
    `В меню “Премиум” мы используем не только красивый дизайн упаковки,
    но и качественное исполнение блюд. Красная рыба, морепродукты,
    фрукты - ресторанное меню без похода в ресторан!`,
    '15',
    '.menu__field .container'
  ).render();
  new Card(
    'img/tabs/post.jpg',
    'post',
    'Меню "Постное"',
    `Меню “Постное” - это тщательный подбор ингредиентов: полное
    отсутствие продуктов животного происхождения, молоко из миндаля,
    овса, кокоса или гречки, правильное количество белков за счет тофу
    и импортных вегетарианских стейков.`,
    '20',
    '.menu__field .container'
  ).render();
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - timer
  const DEADLINE = '2024-10-30';

  function calcTimeDifference(endtime) {
    const dif = Date.parse(endtime) - new Date();
    let days = 0,
      hours = 0,
      minutes = 0,
      seconds = 0;

    if (dif > 0) {
      (days = Math.floor(dif / (24 * 60 * 60 * 1000))),
        (hours = Math.floor((dif / (60 * 60 * 1000)) % 24)),
        (minutes = Math.floor((dif / (60 * 1000)) % 60)),
        (seconds = Math.floor((dif / 1000) % 60));
    }

    return {
      dif,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function addZero(n) {
    return n < 10 ? `0${n}` : n;
  }

  function createTimer(selector, deadline) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      interval1 = setInterval(setTime, 1000);

    setTime();

    function setTime() {
      const t = calcTimeDifference(deadline);
      // console.log('tick');
      days.textContent = addZero(t.days);
      hours.textContent = addZero(t.hours);
      minutes.textContent = addZero(t.minutes);
      seconds.textContent = addZero(t.seconds);
      if (t.dif < 0) {
        clearInterval(interval1);
      }
    }
  }

  createTimer('.timer', DEADLINE);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - modal
  const openModalButtons = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');

  openModalButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      openModal('.modal');
    });
  });
  function openModal(modalSelector) {
    document.querySelector(modalSelector).classList.remove('hidden');
    document.documentElement.style.overflow = 'hidden';
    window.removeEventListener('scroll', showModalByScroll);
  }
  function closeModal(modalSelector) {
    document.querySelector(modalSelector).classList.add('hidden');
    document.documentElement.style.overflow = '';
  }
  modal.addEventListener('click', (event) => {
    const target = event.target;
    if (target.matches('.modal') || target.matches('.modal__close')) {
      closeModal('.modal');
    }
  });

  window.addEventListener('scroll', showModalByScroll);

  function showModalByScroll() {
    const doc = document.documentElement;
    if (doc.scrollTop >= doc.scrollHeight - doc.clientHeight) {
      openModal('.modal');
    }
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - form

  const forms = document.querySelectorAll('form');
  const message = {
    loading: './img/form/spinner.svg',
    success: 'Скоро мы с вами свяжемся.',
    failure: 'Что-то пошло не так',
  };

  function sendData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');
      const formData = new FormData(form);
      const obj = {};
      formData.forEach((value, key) => {
        obj[key] = value;
      });
      request.send(JSON.stringify(obj));

      const spinner = document.createElement('img');
      spinner.src = message.loading;
      spinner.classList.add('centered');
      form.after(spinner);

      request.addEventListener('load', () => {
        form.reset();
        if (request.status === 200) {
          showThanksModal(message.success);
        } else {
          showThanksModal(message.failure);
        }
        spinner.remove();
      });
    });
  }

  function showThanksModal(text) {
    openModal('.modal');
    const previousModalDialog = document.querySelector('.modal__dialog'),
      thanksModal = document.createElement('div');
    previousModalDialog.classList.add('hidden');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close="">×</div>
        <div class="modal__title">${text}</div>
      </div>
      `;
    document.querySelector('.modal').append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      closeModal('.modal');
      previousModalDialog.classList.remove('hidden');
    }, 3000);
  }

  forms.forEach((form) => {
    sendData(form);
  });
});
