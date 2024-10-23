'use strict';
/*
console.log('Запрос данных...');
const req = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Подготовка данных');
    const product = {
      name: 'TV',
      price: 2000,
    };
    resolve(product);
  }, 2000);
});

req
  .then((product) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        product.status = 'ordered';
        resolve(product);
      }, 2000);
    });
  })
  .then((data) => {
    data.modify = true;
    return data;
  })
  .then((data) => {
    console.log(data);
  });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function fetchUserInfo(callback) {
  setTimeout(() => {
    //fetch
    const data = { id: 1, name: 'Alex' };
    callback(data);
  }, 1000);
}

function fetchUserGames(id, callback) {
  setTimeout(() => {
    //fetch (id)
    const data = ['game1', 'game2'];
    callback(data);
  }, 1000);
}

// function run() {
//   fetchUserInfo((userInfo) => {
//     console.log(userInfo);
//     fetchUserGames(userInfo.id, (userGames) => {
//       console.log(userGames);
//     });
//   });
// }

// run();

function fetchUserData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // fetch
      const data = { id: 1, name: 'Alex' }; // данные с сервера
      resolve(data);
    }, 100);
  });
}

function fetchUserGames(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // fetch id
      const data = ['game1', 'game2'];
      resolve(data);
    }, 1000);
  });
}

function run() {
  fetchUserData()
    .then((userData) => {
      // когда будет вызван resolve, тогда будет вызван и then. Вызовется только тогда, когда будет вызван resolve внутри промиса.
      return fetchUserGames(userData.id);
    })
    .then((userGames) => {
      console.log(userGames);
    });
}

run();

const body = document.querySelector('body');
function renderGames(games) {
  document.querySelector('#loading').remove();
  games.forEach((game) => {
    const gameElement = document.createElement('div');
    gameElement.innerText = `Game: ${game.name}`;
    gameElement.classList.add('game-el');
    body.append(gameElement);
  });
}
function fetchGames() {
  // типо запрос отправляем
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // const gamesFromServer = [
      //   { id: 1, name: 'Spider man' },
      //   { id: 2, name: 'Mario' },
      // ];
      const gamesFromServer = 'error'; // Неожиданная ситуация. Сервер чет непонятное вернул, а мы ожидаем массив.
      // т.е. промис завершился с ошибкой
      if (Array.isArray(gamesFromServer)) {
        resolve(gamesFromServer);
      } else {
        reject('Что-то пошло не так...');
      }
    }, 3000);
  });
}
renderLoading();
fetchGames()
  .then((games) => {
    renderGames(games);
  })
  .catch((message) => {
    renderErrorMessage();
    console.log(message);
  });

function renderLoading() {
  const loading = document.createElement('div');
  loading.id = 'loading';
  loading.textContent = 'Loading...';
  body.append(loading);
}
 */

/* console.log('Запрос данных');

const req = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Подготовка данных');
    const product = {
      name: 'TV',
      price: 1999,
    };
    resolve(product);
  }, 1000);
});

req
  .then((product) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        product.status = 'order';
        reject();
      }, 1000);
    });
  })
  .then((data) => {
    data.modify = true;
    return data;
  })
  .then((data) => {
    console.log(data);
  })
  .catch(() => {
    console.error('Error');
  })
  .finally(() => {
    console.log('End');
  }); */

// const test = (time) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve();
//     }, time);
//   });
// };

// /* test(1000).then(() => {
//   console.log('1000');
// });
// test(2000).then(() => {
//   console.log('2000');
// }); */
// Promise.all([test(1000), test(2000)]).then(() => {
//   console.log('all');
// });

// Promise.race([test(1000), test(2000)]).then(() => {
//   console.log('all');
// });

/* let isMomHappy = false;
const willGetNewPhone = new Promise((resolve, reject) => {
  if (isMomHappy) {
    const gift = 'phone';
    resolve(gift);
  } else {
    reject();
  }
});
willGetNewPhone
  .then(showOff)
  .then((a) => {
    console.log(a);
  })
  .catch(() => {
    console.log('nope');
  })
  .finally(() => {
    console.log('End');
  });

function showOff(phone) {
  return new Promise((resolve, reject) => {
    resolve(`I have a new ${phone}`);
  });
} */
