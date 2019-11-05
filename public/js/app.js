const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

const messageToWrite = document.querySelector('#messageToWrite')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location)
        .then(response => {
        response.json().then(data => {
            if(data.error) {
                messageOne.textContent = data.error
            } else {
                const msgArray = []
                for(let i = 0; i < data.location.length; i++) {
                    msgArray[i] = '<li>' +  data.location[i].location + ' :  ' + data.forecast[i] + '</li>'
                }
                messageOne.textContent = ''
                messageToWrite.innerHTML = msgArray;
            }
        }).catch(error => {
            messageOne.textContent = 'Unable to find location. Try another search'
        })
    }).catch((error) => {
        messageOne.textContent = error
    })
})