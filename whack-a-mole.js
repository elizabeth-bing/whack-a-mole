// -    -   -   -   -  //
// JAVASCRIPT CARNIVAL //
// -    -   -   -   -  //

// - The ability to store or get references to the cells in the HTML table.
// - A function to randomly select which cell should show the mole.
// - A way to show a mole in the chosen cell.

console.log('Whack-a-Mole!')

let holes = document.getElementsByTagName('td') //create array for each cell, 0-24td from left to right
let mole = document.createElement('img')
let previousPick = -Infinity

mole.src = 'mole.PNG'
mole.classList.add('mole') //add class list to minimise mole image
mole.addEventListener('click', moleClicked)
console.log(holes)
showMole()

//add time display via JS into display
let timeDisplay = document.createElement('p')
timeDisplay.textContent = '0'
document.body.append(timeDisplay)

//create start button all via JS
let startButton = document.createElement('button')
startButton.addEventListener('click', startGame)
startButton.textContent = 'Start!'
document.body.append(startButton)

//add counter display via JS
let counterDisplay = document.createElement('p')
counterDisplay.textContent = 'Moles whacked: 0'
document.body.append(counterDisplay)

//add high score display via JS
let highScoreBoard = document.createElement('p')
highScoreBoard.textContent = 'High Score: 0'
document.body.append(highScoreBoard)

const playAgain = function () {
  counter = 0
  startGame()
  playAgainButton.classList.add('hidden')
}
//create playAgain button all via JS
let playAgainButton = document.createElement('button')
playAgainButton.addEventListener('click', playAgain)
playAgainButton.textContent = 'Play again?'
document.body.append(playAgainButton)
playAgainButton.classList.add('hidden')

let counter = 0
const molesWhacked = function () {
  counter++
  counterDisplay.textContent = `Moles whacked: ${counter}!`
}
let highScore = 0

const addHighScore = function () {
  if (counter > highScore) {
    highScore = counter
    highScoreBoard.textContent = ` High Score: ${highScore}`
  }
}

function moleClicked(e) {
  // let cell = e.target
  if (gameOver) {
    return
  }

  mole.remove() //remove mole

  //count how many moled have been whacked

  molesWhacked()
  var audio = new Audio('whack-audio.wav')
  audio.play()
  showMole()
}

function startGame() {
  gameOver = false
  startButton.disabled = true
  startTimer()
}

function stopGame() {
  startButton.disabled = false
}

function showMole() {
  //add mole image

  let randomNo = previousPick
  while (randomNo === previousPick) {
    randomNo = Math.floor(Math.random() * holes.length) //randomise numbers
  }
  previousPick = randomNo

  let randomCell = holes[randomNo] //pick random number
  randomCell.appendChild(mole) //add mole to random cell
}

//start timer function
let token = null
let remaining = 0
let gameOver = true

function startTimer() {
  remaining = 10
  timeDisplay.textContent = String(remaining)

  token = setInterval(function () {
    remaining--
    timeDisplay.textContent = String(remaining)
    if (remaining === 0) {
      clearInterval(token) //lines 79-81 put in separate end game function, call function here  then in end game function also call highsore calc function
      token = null
      addHighScore()
      playAgainButton.classList.remove('hidden')
      gameOver = true
    }
  }, 1000)
}
