
const words = ["programming", "javascript", "developer", "keyboard", "challenge", "coding", "html", "css", "gpt", "challenge"];
let currentWordIndex = 0;
let targetWord = words[currentWordIndex];

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
    document.getElementById(firstChar).style.backgroundColor = "gold";
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
      displayWritten("");
      currentWordIndex = (currentWordIndex + 1) % words.length;
      targetWord = words[currentWordIndex];
      displayWord();
    }
  }
}