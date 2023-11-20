
const motsFrancais = [
  "Monstre","Enfant","Mignon","Jeu","Défi","Effrayant","Amusant","Aventure","Doux","Ludique","Terrible","Petite créature","Sourire","Effort",
  "Fantaisie","Petite bête","Récompense","Énigme","Intriguant","Créatif","Épique","Émerveillement","Mystérieux","Joie","Extraordinaire",
  "Exploration","Éclatant","Courir","Tendre","Magique","Téméraire","Chasse","Bonbon","Chuchoter","Étonnant","Trésor","Risquer","Rire","Frisson",
  "Enchanté","Petit héros","Fabuleux","Capture","Énergie","Capture d'écran","Éblouissant","Ailes","Poursuite","Bonheur","Adorable"
];

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words_array.length);
  return words_array[randomIndex];
}

let targetWord = getRandomWord();
let wordsCount = 0;


// Display the initial word
displayWord();

// Listen for key presses
document.addEventListener('keydown', handleKeyPress);

function turnKeysToWhite() {
  const letterKeyElements = document.getElementsByClassName("letter");
  const letterKeyArray = Array.from(letterKeyElements);

  letterKeyArray.forEach((element) => {
    element.style.backgroundColor = "#FFFFF4";
  });
}

function turnKeyToGold() {
  const firstChar = targetWord.charAt(0).toLocaleUpperCase();
  if( document.getElementById(firstChar)){
    document.getElementById(firstChar).style.backgroundColor = "#FFBE0B";
  }
}


function displayWord() {
  document.getElementById('targetWord').textContent = targetWord;
  turnKeysToWhite();
  turnKeyToGold();

}

function displayWritten(char) {
    if (char === "") {
        document.getElementById('wordWritten').textContent = "";
    } else {
        document.getElementById('wordWritten').textContent = document.getElementById('wordWritten').textContent + char;
    }
}

function handleEndFight() {
  document.getElementById('overlay').style.display = 'block';

  let label = document.createElement('div');
  label.id = 'endLabel';
  label.innerText = 'You defeated the monster, well done!';
  document.body.appendChild(label);

  setTimeout(function () {
    window.location.href = 'mainGame.html';
  }, 3000); // 5000 milliseconds = 5 seconds

}

function handleKeyPress(event) {
  const typedChar = String.fromCharCode(event.keyCode).toLowerCase();
  const currentChar = targetWord.charAt(0).toLowerCase();

  if (typedChar === currentChar) {
    // Correct key pressed
    displayWritten(currentChar);
    targetWord = targetWord.substring(1); // Remove the first character
    displayWord();

    if (targetWord === "") {
      // Move to the next word when the current one is completed
      wordsCount++;
      console.log(wordsCount);

      if (wordsCount === 5) {
        handleEndFight();
      }

      displayWritten("");
      targetWord = getRandomWord();
      displayWord();
    }
  }
}