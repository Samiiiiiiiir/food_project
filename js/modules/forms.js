import { closeModal, openModal } from './modal';
import { postData } from '../services/services';

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
    openModal('.modal', openModalTimerId);
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
      closeModal('.modal');
    }, 5000);
  }

  fetch('http://localhost:3000/menu')
    .then((data) => data.json())
    .then((res) => console.log(res));
}

export default forms;
