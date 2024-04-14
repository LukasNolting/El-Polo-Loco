let canvas;
let world;
let keyboard = new Keyboard();
let intervalIDs = [];
let backgroundMusic = new Audio('./audio/background_music.mp3');
backgroundMusic.volume = 0.2;
backgroundMusic.loop = true;
let backgroundSound = false;
let masterSound = true;


/**
 * Function to start the game by closing the start screen, displaying loading screen, initializing the level,
 * getting the canvas element, playing background music, and creating a new World.
 *
 */
async function startGame() {
  closeStartScreen();
  loadingScreen();
  initLevel();
  canvas = document.getElementById('canvas');
  playBackgroundMusic();
  world = new World(canvas, keyboard);
}


/**
 * Function to display a loading screen temporarily.
 *
 */
async function loadingScreen() {
  document.getElementById('loadingScreen').classList.remove('hide');
  setTimeout(() => {
    document.getElementById('loadingScreen').classList.add('hide');
  }, 800);
}


/**
 * Closes the start screen, hides the start and game over screens, reveals the game canvas, and updates the mobile button wrapper class.
 *
 */
function closeStartScreen() {
  document.getElementById('startScreen').classList.add('d-none');
  document.getElementById('gameOverScreen').classList.add('d-none');
  document.getElementById('canvas').classList.remove('d-none');
  document.getElementById("btn-mobile-wrapper").classList.add("btn-mobile-wrapper-800")
}


/**
 * Function to navigate back to the main menu and display the necessary screens.
 *
 */
function backToMenu() {
  document.getElementById('startScreen').classList.remove('d-none');
  document.getElementById("gameOverScreen").classList.add('d-none');
  document.getElementById("winGameScreen").classList.add('d-none');
  document.getElementById("canvas").classList.remove('d-none');
  document.getElementById("btn-mobile-wrapper").style.display = "none";
  playBackgroundMusic();
}


/**
 * Function to display the game over screen, stop the game, hide the mute button, pause the background music, and hide the mobile button wrapper.
 */
function gameOver() {
  document.getElementById("gameOverScreen").classList.remove('d-none');
  stopGame();
  backgroundMusic.pause();
  document.getElementById("btn-mobile-wrapper").classList.remove("btn-mobile-wrapper-800");
}


/**
 * Function to display the win game screen, stop the game, hide the mute button, pause the background music, and hide the mobile button wrapper.
 *
 */
function winGame() {
  document.getElementById("winGameScreen").classList.remove('d-none');
  stopGame();
  backgroundMusic.pause();
  document.getElementById("btn-mobile-wrapper").classList.remove("btn-mobile-wrapper-800");
}


/**
 * Restarts the game by initializing the world, hiding the game over and win game screens, 
 * showing the canvas and mute button, closing the start screen, and starting the game.
 *
 * @param {type} canvas - The canvas element where the game is rendered.
 * @param {type} keyboard - The keyboard input for controlling the game.
 */
function restartGame() {
  world = new World(canvas, keyboard);
  document.getElementById("gameOverScreen").classList.add('d-none');
  document.getElementById("winGameScreen").classList.add('d-none');
  document.getElementById("canvas").classList.remove('d-none');
  closeStartScreen();
  startGame();
}


/**
 * Stops the game by clearing all intervals up to 9999.
 *
 */
function stopGame() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
  }
}


/**
 * Sets up an interval that can be stopped.
 *
 * @param {function} fn - The function to be executed at each interval
 * @param {number} time - The time interval in milliseconds
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIDs.push(id);
}


/**
 * Function to play or pause the background music based on the backgroundSound variable.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function playBackgroundMusic() {
  if (backgroundSound) {
    backgroundMusic.play();
  } else {
    backgroundMusic.pause();
  }
}


/**
 * Toggles the mute status for both master sound and background sound.
 *
 */
function toggleMute() {
  masterSound = !masterSound;
  backgroundSound = !backgroundSound;
  playBackgroundMusic();
  updateMuteIcon();
}


/**
 * Updates the mute icon based on the state of the background sound.
 *
 * @param {void} None
 * @return {void} None
 */
function updateMuteIcon() {
  let muteIcon = document.getElementById('muteIcon');
  if (backgroundSound) {
    muteIcon.src = './img/12_icons/sound_on.svg';
  } else {
    muteIcon.src = './img/12_icons/sound_off.svg';
  }
}
