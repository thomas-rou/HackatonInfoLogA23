const background = document.querySelector('#mask');
const instructionBox = document.querySelector('.instructions-container');
const leftArrow = document.querySelector('#left');
const rightArrow = document.querySelector('#right');
const instruction = document.querySelector('.instruction')
const menuButton = document.querySelector('#back');

const tutorial = {
    1 : "Utilise les flèches pour explorer la maison",
    2 : "Utilise la lampe de poche pour trouver tous les monstres cachés dans la pièce",
    3 : "Cliquer sur chaque monstre trouvé et combat les en réussissant un mini jeu",
    4 : "Gagne la partie après avoir vaincu tous les 3 monstres!"
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fadeInBackground() {
    for (let opacity = 1; opacity >= 0; opacity -= 0.01) {
        await delay(15);
        background.style.opacity = opacity;
    }
    background.style.display = 'none';
    for (let opacity = 0; opacity <= 1; opacity += 0.01) {
        await delay(15);
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
        menuButton.style.opacity = opacity;
        instructionBox.style.opacity = opacity;
    }
    background.style.display = 'block';
    for (let opacity = 0; opacity <= 1; opacity += 0.01) {
        await delay(15);
        background.style.opacity = opacity;
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

function searchLight(){
    window.addEventListener("load", function() {
        const img = document.getElementsByTagName("image")[0];
        const imgPos = img.getBoundingClientRect();
        const imgX = imgPos.left;
        const imgY = imgPos.top;
        const circle = document.getElementsByTagName("circle")[0];
        img.addEventListener("mousemove", function(e) {
            circle.setAttribute("cx", e.clientX - imgX);
            circle.setAttribute("cy", e.clientY - imgY);
            img.style.setProperty("--cursorX", e.clientX - imgX);
            img.style.setProperty("--cursorY", e.clientY - imgY);
            }, false);
    }, false);
    }
    
    searchLight();
