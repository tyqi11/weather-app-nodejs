const weatherForm = document.querySelector('form')
const searchItem = document.querySelector('input')
const msgOne = document.querySelector('#msg-one')
const msgTwo = document.querySelector('#msg-two')

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault() // prevent from reloading the page after submitting

  const location = searchItem.value

  msgOne.textContent = 'Loading...'
  msgTwo.textContent = ''

  const searchUrl = 'http://localhost:3000/weather?address=' + location;
  fetch(searchUrl).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msgOne.textContent = data.error
      } else {
        msgOne.textContent = data.location
        msgTwo.textContent = data.forecast
      }
    })
  })
})
