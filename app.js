const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#37AB65', '#3DF735', '#AD6D70', '#EC2504', '#8C0B90', '#C0E4FF', '#27B502', '#7C60A8', '#CF95D7', '#f0ed4f', '#f50fcb', '#46c2f0', '#ff0044']

let time = 0
let score = 0


startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})


timeList.addEventListener('click', event => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time')) 
    screens[1].classList.add('up') 
    startGame()
  }
})

board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})


function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
      let current = --time
      if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
  const circle = document.createElement('div')
  const size = getRendomNumber(10, 60)
  const {width, height} = board.getBoundingClientRect()
  const x = getRendomNumber(0, width - size)
  const y = getRendomNumber(0, height - size)

  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.backgroundColor = getRandomColor()

  board.append(circle)
}

function getRendomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}


function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}