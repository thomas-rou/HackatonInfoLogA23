
const words_array = [ 
  "Happy", "Monster", "Sunshine", "Rainbow", "Friendship", "Adventure", "Magic", "Brave", "Laughter", "Teddy",
  "Castle", "Butterfly", "Cupcake", "Dream", "Smiles", "Treasure", "Unicorn", "Superhero", "Puppy", "Popcorn","Joyful", "Snuggle",
  "Moonlight", "Playful", "Ocean", "Hug", "Harmony", "Enchanting", "Giggle", "Exploration", "Cookie", "Starlight", "Cuddle", "Wonder",
  "Blossom", "Serenade", "Jolly", "Pajamas", "Giggly", "Quest", "Radiant", "Lullaby", "Sweetheart", "Candy", "Whisper",
  "Cherish", "Delightful", "Sunshine", "Gummybear", "Wondrous", "Pillow", "Happiness", "Dazzle", "Rainbow", "Harmony",
  "Blissful", "Muffin", "Harmony", "Fluffy", "Hug",  "Mischief", "Cheerful", "Enchantment", "Playful", "Cozy","Harmony", "Lollipop", 
  "Delight", "Cozy", "Cuddle", "Glitter", "Snuggle"
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
    window.location.href = 'index.html';
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