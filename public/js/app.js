console.log(`Client side js file is loaded!`);

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#location');
const messageTwo = document.querySelector('#forecast');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const location = search.value;

  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
