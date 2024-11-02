import calculator from './modules/calculator';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';

import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
  const openModalTimeoutId = setTimeout(
    () => openModal('.modal', openModalTimeoutId),
    400000
  );
  calculator();
  cards();
  forms('form', openModalTimeoutId);
  modal('[data-modal]', '.modal', openModalTimeoutId);
  slider({
    container: '.offer__slider',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    slide: '.offer__slide',
    totalCounter: '#total',
    currentCounter: 'span#current',
    wrapper: '.offer__slider-wrapper',
    slidesField: '.offer__slider-inner',
  });
  tabs(
    '.tabheader__item',
    '.tabcontent',
    '.tabheader__items',
    'tabheader__item_active'
  );
  timer('.timer', '2024-11-30');
});
