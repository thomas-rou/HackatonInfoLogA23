
const words_array = [
  "Monstre","Enfant","Mignon","Jeu","Défi","Effrayant","Amusant","Aventure","Doux","Ludique","Terrible","Petite créature","Sourire","Effort",
  "Fantaisie","Petite bête","Récompense","Énigme","Intriguant","Créatif","Épique","Émerveillement","Mystérieux","Joie","Extraordinaire",
  "Exploration","Éclatant","Courir","Tendre","Magique","Téméraire","Chasse","Bonbon","Chuchoter","Étonnant","Trésor","Risquer","Rire","Frisson",
  "Enchanté","Petit héros","Fabuleux","Capture","Énergie","Capture d'écran","Éblouissant","Ailes","Poursuite","Bonheur","Adorable"
];

const nonAlphanumericKeys = ["Backspace", "Shift", "Enter", "Tab", "CapsLock", "Alt", "Control", "Meta", "Escape",
  "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Delete", "End", "Home", "PageDown", "PageUp", "Insert",
  "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "ScrollLock", "Pause", "ContextMenu",
  "PrintScreen", "NumLock", "Clear", "BrowserBack", "BrowserForward", "BrowserRefresh", "BrowserStop", "BrowserSearch",
  "BrowserFavorites", "BrowserHome", "VolumeMute", "VolumeDown", "VolumeUp", "MediaTrackNext", "MediaTrackPrevious",
  "MediaStop", "MediaPlayPause", "Semicolon", "Equal", "Comma", "Minus", "Period", "Slash", "Backquote", "BracketLeft",
  "Backslash", "BracketRight", "Quote"];

const monster_array = ['monster_1.png', 'monster_2.png', 'monster_3.png', 'monster_4.png', 'monster_5.png']

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words_array.length);
  return words_array[randomIndex];
}

function getRandomMonster() {
  const randomIndex = Math.floor(Math.random() * monster_array.length);
  return monster_array[randomIndex];
}

let targetWord = getRandomWord();
let wordsCount = 0;
const endGameScreenTime = 5000;
const maxWords = 5;
let wrongKeys = 0;


// Display the initial word
displayWord();
displayMonster();

// Listen for key presses
document.addEventListener('keydown', handleKeyPress);

function turnKeysToWhite() {
  const letterKeyElements = document.getElementsByClassName("letter");
  const letterKeyArray = Array.from(letterKeyElements);

  letterKeyArray.forEach((element) => {
    element.style.backgroundColor = "#FFFFF4";
  });
}

function turnKeyWhite(pressedKey) {
  const char = pressedKey.toLocaleUpperCase();
  if( document.getElementById(char)){
    document.getElementById(char).style.backgroundColor = "#FFFFF4";
  }
}

function turnKeyToGold() {
  const firstChar = targetWord.charAt(0).toLocaleUpperCase();
  if( document.getElementById(firstChar)){
    document.getElementById(firstChar).style.backgroundColor = "#FFBE0B";
  }
}

function turnKeyRed(pressedKey) {
  let char = pressedKey.toLocaleUpperCase();
  if( document.getElementById(char)){
    document.getElementById(char).style.backgroundColor = "#FF0000";
  }
}

function turnKeyPurple(pressedKey) {
  let char = pressedKey.toLocaleUpperCase();
  if( document.getElementById(char)){
    document.getElementById(char).style.backgroundColor = "#6F00FF";
  }
}


function displayWord() {
  document.getElementById('targetWord').textContent = targetWord;
  turnKeysToWhite();
  turnKeyToGold();
}

function displayMonster() {
  const urlParams = new URLSearchParams(window.location.search);
  const monsterIndex = urlParams.get("monsterIndex");
  document.getElementById('monster').src = `./assets/png/monster/monster_${monsterIndex}.png`;
}

function displayWritten(char) {
    if (char === "") {
        document.getElementById('wordWritten').textContent = "";
    } else {
        document.getElementById('wordWritten').textContent = document.getElementById('wordWritten').textContent + char;
    }
}

function handleEndFight() {
  document.removeEventListener('keydown', handleKeyPress);
  document.getElementById('overlay').style.display = 'block';

  let label = document.createElement('div');
  label.id = 'endLabel';
  label.innerText = 'Vous avez vaincu le monstre, bien joué !' + '\n' + 'Vous avez fait ' + wrongKeys + ' erreurs.';
  document.body.appendChild(label);

  setTimeout(function () {
    window.location.href = 'mainGame.html';
  }, endGameScreenTime);

}

function handleKeyPress(event) {
  const typedChar = event.key;
  const currentChar = targetWord.charAt(0);

  if (typedChar === currentChar) {
    // Correct key pressed
    displayWritten(currentChar);
    targetWord = targetWord.substring(1); // Remove the first character
    displayWord();

    if (targetWord === "") {
      // Move to the next word when the current one is completed
      wordsCount++;
      console.log(wordsCount);

      if (wordsCount === maxWords) {
        handleEndFight();
      }

      displayWritten("");
      targetWord = getRandomWord();
      displayWord();
    }
  } else if (nonAlphanumericKeys.includes(typedChar)){
      turnKeyPurple(typedChar);
      setTimeout(function () {
      turnKeyWhite(typedChar);
    }, 100);
  } else {
    wrongKeys++;
    turnKeyRed(typedChar);
    setTimeout(function () {
      turnKeyWhite(typedChar);
    }, 100);
  }
}