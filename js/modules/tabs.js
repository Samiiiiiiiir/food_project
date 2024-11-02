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

export default tabs;
