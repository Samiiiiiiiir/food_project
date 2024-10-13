// window.addEventListener('DOMContentLoaded', () => { });

const tabHeaderWrapper = document.querySelector('.tabheader__items'),
  tabsContent = document.querySelectorAll('.tabcontent'),
  tabsHeader = document.querySelectorAll('.tabheader__item');

tabHeaderWrapper.addEventListener('click', (event) => {
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
showTab();
