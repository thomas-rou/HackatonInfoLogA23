const background = document.querySelector('#bedroom');
const instructionBox = document.querySelector('.instructions-container');
const leftArrow = document.querySelector('#left');
const rightArrow = document.querySelector('#right');
const instruction = document.querySelector('.instruction')
const menuButton = document.querySelector('#back');

const tutorial = {
    1 : "Utilise les flèches pour explorer la maison",
    2 : "Utilise la lampe de poche pour trouver tous les monstres cachés dans la pièce",
    3 : "Combat chaque monstre trouvé en réussissant un mini jeu",
    4 : "Gagne la partie après avoir vaincu tous les 3 monstres!"
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fadeInBackground() {
    background.style.opacity = 0;
    menuButton.style.opacity = 0;
    for (let opacity = 0; opacity <= 1; opacity += 0.01) {
        await delay(15);
        background.style.opacity = opacity;
        menuButton.style.opacity = opacity;
    }
}

async function fadeInTutorial() {
    instructionBox.style.opacity = 0;
    for (let opacity = 0; opacity <= 1; opacity += 0.01) {
        await delay(15);
        instructionBox.style.opacity = opacity;
    }
}

async function fadeOut() {
    for (let opacity = 1; opacity >= 0; opacity -= 0.01) {
        await delay(15);
        background.style.opacity = opacity;
        menuButton.style.opacity = opacity;
        instructionBox.style.opacity = opacity;
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    await fadeInBackground();
    await fadeInTutorial();
});

menuButton.addEventListener("click", async function () {
    await fadeOut();
    window.location.href = "mainMenu.html";
});

function previous() {
    const currentSequence = parseInt(instruction.getAttribute('data-sequence'), 10);
    const previousSequence = Math.max(currentSequence - 1, 1); // Ensure it doesn't go below 1
    instruction.setAttribute('data-sequence', previousSequence);
    if (previousSequence === 1) {
        leftArrow.style.display = 'none';
    }
    else {
        leftArrow.style.display = 'block';
        rightArrow.style.display = 'block';
    }
    instruction.querySelector('p').innerText = tutorial[previousSequence];
}

function next() {
    const currentSequence = parseInt(instruction.getAttribute('data-sequence'), 10);
    const nextSequence = Math.min(currentSequence + 1, 4); // Ensure it doesn't go over 4
    instruction.setAttribute('data-sequence', nextSequence);
    if (nextSequence === 4) {
        rightArrow.style.display = 'none';
    }
    else {
        leftArrow.style.display = 'block';
        rightArrow.style.display = 'block';
    }
    instruction.querySelector('p').innerText = tutorial[nextSequence];
}
