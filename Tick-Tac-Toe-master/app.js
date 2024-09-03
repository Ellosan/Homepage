// Global Variables Here
const start = document.getElementsByTagName('start')[0]
const winner = document.getElementsByTagName('win')[0]
const draw = document.getElementsByTagName('draw')[0]
let gameActive = null
let x = 0
let xCount = document.querySelector(`.tick-wins`)
let o = 0
let oCount = document.querySelector(`.toe-wins`)
let draws = 0
let drawCount = document.querySelector(`.draw-count`)
let currentPlayer = null
let playCount = []
let oPositions = []
let xPositions = []
let cells = document.getElementsByClassName(`cells`)
let positionMatch = 0
const volumeOn = document.getElementById(`volume-on`)
const volumeOff = document.getElementById(`volume-off`)
const volume = document.getElementsByClassName(`volume`)
const gameAudio = document.getElementById(`game-audio`)
const gameStart = document.querySelector(`h3`)
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

////////////////////////////////
// Functions For Game Logic Here
// Win/Draw Count
function tally() {
  xCount.innerHTML = x
  oCount.innerHTML = o
  drawCount.innerHTML = draws
}

// Current Player Display Switch
function playerSwitch() {
  if (currentPlayer === 'x') {
    document.querySelector('p').innerText = "Tick's Turn"
  } else document.querySelector('p').innerText = "Toe's Turn"
}
let switches = function (check) {
  if (check === xPositions) {
    currentPlayer = 'o'
    playerSwitch()
    positionMatch = 0
  } else if (check === oPositions) {
    currentPlayer = 'x'
    playerSwitch()
    positionMatch = 0
  }
}

// Game Start
const startGame = function (text) {
  text.style.display = `none`
  gameActive = true
  if (currentPlayer === 'o') {
    currentPlayer = 'x'
  } else if (currentPlayer === 'x') {
    currentPlayer = 'o'
  } else currentPlayer = 'x'
  playerSwitch()
  tally()
}

// Board Reset
let reset = function () {
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = ''
  }
}

// End Check Functions
let addEndScreen = function (text) {
  reset()
  playCount = []
  oPositions = []
  xPositions = []
  text.style.display = `grid`
}
// Draw Check
let drawCheck = function () {
  if (playCount.length === 9 && positionMatch === 3) {
    draws = draws + 1
    gameActive = false
    addEndScreen(draw)
  }
}
// Win || Draw Check/Win Counter Logic
let winCheck = function (positionArray) {
  for (let i1 = 0; i1 < 8; i1++) {
    positionMatch = 0
    for (let i2 = 0; i2 < 3; i2++) {
      if (positionArray.indexOf(winCombos.slice()[i1][i2]) > -1) {
        positionMatch = positionMatch + 1
      }
      if (positionMatch > 2) {
        if (currentPlayer === 'x' && xPositions.length > oPositions.length) {
          x = x + 1
        } else if ((currentPlayer = 'o')) {
          o = o + 1
        }
        gameActive = false
        addEndScreen(winner)
      }
    }
  }
  positionMatch = 0
  switches(positionArray)
  if (playCount.length === 9 && positionMatch === 0) {
    draws = draws + 1
    gameActive = false
    addEndScreen(draw)
  }
}

// Board Click Functions
let xClick = function (event, i) {
  event.target.innerHTML = `<img class='tick-sb' src='./images/tick.png' alt='tick'></div>`
  xPositions.push(i)
  playCount.push(i)
  winCheck(xPositions)
}
let oClick = function (event, i) {
  event.target.innerHTML = `<img class='toe-sb' src='./images/big-toe.png' alt='toe'>`
  oPositions.push(i)
  playCount.push(i)
  winCheck(oPositions)
}

////////////////////////////////
// Event Listeners Here

//Volume Button Click Listener
for (let i = 0; i < volume.length; i++) {
  volume[i].addEventListener(`click`, function (e) {
    if (e.target.id === 'volume-on') {
      volumeOn.style.display = 'none'
      volumeOff.style.pointerEvents = 'all'
      volumeOff.style.display = 'flex'
      volumeOff.style.opacity = 1
      gameAudio.pause()
      gameAudio.currentTime = 0
    } else {
      volumeOff.style.pointerEvents = 'none'
      volumeOn.style.display = 'flex'
      volumeOff.style.display = 'none'
      volumeOff.style.opacity = 0
      gameAudio.play()
    }
  })
}
volumeOn.addEventListener('mouseover', function () {
  volumeOff.style.display = 'flex'
  volumeOff.style.opacity = 0.35
})
volumeOn.addEventListener('mouseout', function () {
  if (volumeOn.style.display !== `none`) {
    volumeOff.style.display = 'none'
    volumeOff.style.opacity = 1
  }
})
//Start Screen Click Listeners

gameStart.addEventListener('click', function () {
  startGame(start)
  gameAudio.play()
})
document.getElementById(`winReplay`).addEventListener('click', function () {
  startGame(winner)
})
document.getElementById(`drawReplay`).addEventListener('click', function () {
  startGame(draw)
})

//Board Click Listener
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', function (event) {
    if (currentPlayer === 'x' && playCount.indexOf(i) === -1) {
      xClick(event, i)
    } else if (currentPlayer === 'o' && playCount.indexOf(i) === -1) {
      oClick(event, i)
    }
  })
}
