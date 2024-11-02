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

export default modal;

export { closeModal, openModal };
