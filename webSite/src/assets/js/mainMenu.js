const background = document.querySelector('#background');
const menu = document.querySelector('.container');
const play = document.querySelector('#play');
const tutorial = document.querySelector('#tutorial');

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fadeInBackground() {
    background.style.opacity = 0;
    for (let opacity = 0; opacity <= 1; opacity += 0.01) {
        await delay(15);
        background.style.opacity = opacity;
    }
}

async function fadeInMenu() {
    menu.style.opacity = 0;
    for (let opacity = 0; opacity <= 1; opacity += 0.01) {
        await delay(15);
        menu.style.opacity = opacity;
    }
}

async function fadeOut() {
    for (let opacity = 1; opacity >= 0; opacity -= 0.01) {
        await delay(15);
        background.style.opacity = opacity;
        menu.style.opacity = opacity;
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    await fadeInBackground();
    await fadeInMenu();
});

play.addEventListener("click", async function(event) {
    event.preventDefault();
    await fadeOut();
    window.location.href = "mainStory.html";
});

tutorial.addEventListener("click", async function(event) {
    event.preventDefault();
    await fadeOut();
    window.location.href = "tutorial.html";
});