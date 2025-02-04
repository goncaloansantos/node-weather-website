console.log('Client side javascript file is loaded!')

/* fetch('https://puzzle.mead.io/puzzle').then(response => {
    response.json().then(data => {
        console.log(data)
    })

}) */



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', e => {
    e.preventDefault()
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    const location = search.value
    fetch('http://localhost:3000/weather?address=' + location).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageTwo.textContent = data.error
            } else {
                messageTwo.textContent = data.location + " - " + data.forecast
            }
        })
    })
    messageOne.textContent=''
})
