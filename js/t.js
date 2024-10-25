window.addEventListener('DOMContentLoaded', () => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
    })
    .catch(() => {
      console.log('errrror');
    });
});
