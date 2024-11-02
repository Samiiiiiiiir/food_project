const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: data,
  });
  return await res.json(); // т.к. не знаем сколько времени
  // понадобится чтобы перевести в обычный объект
};

export { postData };
