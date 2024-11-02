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

export default cards;
