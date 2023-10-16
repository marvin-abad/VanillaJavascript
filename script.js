const RANDOM_QUOTES_API_URL = 'http://api.quotable.io/random'
const displayElement = document.getElementById('quotes_display')
const inputElement = document.getElementById('input')
const timerElement = document.getElementById('timer')

let correct = true

inputElement.addEventListener('input', () => {
    const array = displayElement.querySelectorAll('span')
    const value = inputElement.value.split('')
    array.forEach((characterSpan, index) => {
        const character = value[index]
        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        }else if (character === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }else{
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })

    if(correct) renderRandom()
})

function getRandom() {
    return fetch(RANDOM_QUOTES_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderRandom() {
    const quote = await getRandom()
    displayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        displayElement.appendChild(characterSpan)
    })
    inputElement.value = '' 
    startTimer()
}

let startTime
function startTimer(){
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timerElement.innerText = getTimerTime()
    }, 1000);
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

renderRandom()
