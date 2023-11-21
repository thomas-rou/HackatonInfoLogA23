const startButton = document.querySelector('#start');
const clickText = document.querySelector('#click');
const colorButtons = Array.from(document.getElementsByClassName('color-button'));
const colors = ['#4CC9F0', '#F72585', '#FFBE0B', '#8338EC'];
const sequence = [];
let playerSequence = [];
let round = 1;
let isPlayerTurn = false;

startButton.addEventListener('click', async function() {
    await fadeOutClick();
    startGame();
});

async function startGame() {
    await generateSequence();
    await displaySequence();
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fadeOutClick() {
    for (let opacity = 1; opacity >= 0; opacity -= 0.01) {
        await delay(10);
        clickText.style.opacity = opacity;
    }
}

async function generateSequence() {
    for (let i = 0; i < round; i++) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        sequence.push(randomColor);
    }
}

async function displaySequence() {
    for (let i = 0; i < sequence.length; i++) {
        const color = sequence[i];

        startButton.style.backgroundColor = '#000';
        await delay(150);

        startButton.style.backgroundColor = color;
        await delay(500);
    }

    setTimeout(() => {
        isPlayerTurn = true;
        startButton.style.backgroundColor = '';
    }, sequence.length * 1000);
}

colorButtons.forEach(button => {
    const color = button.getAttribute('data-color');
    button.addEventListener('click', () => handleColorClick(color));
});

function handleColorClick(color) {
    if (isPlayerTurn) {
        playerSequence.push(color);
    }
    if (playerSequence.length === sequence.length) {
        checkPlayerInput();
    }
}

function checkPlayerInput() {
    const isMatch = sequence.every((color, index) => playerSequence[index] === color);

    if (isMatch) {
        if (playerSequence.length === sequence.length) {
            setTimeout(() => {
                round++;
            }, 1000);
        }
    } else {
        alert('Game Over! Try again.');
        round = 1;
    }
    sequence.length = 0;
    playerSequence.length = 0;
    isPlayerTurn = false;
    if (round === 4) {
        endGame();
    } else {
        startGame();
    }

    function endGame() {
        document.getElementById('overlay').style.display = 'block';

        let label = document.createElement('div');
        label.id = 'endLabel';
        label.innerText = 'Tu as battu le monstre, bravo!';
        document.body.appendChild(label);

        setTimeout(function () {
            window.location.href = 'mainGame.html';
        }, 3000);

    }
}