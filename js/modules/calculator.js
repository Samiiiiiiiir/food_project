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

export default calculator;
