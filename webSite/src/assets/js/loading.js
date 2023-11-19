const logo = document.querySelector('#logo');
const spinner = document.querySelector('.spinner');

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fadeIn() {
    logo.style.opacity = 0;

    for (let opacity = 0; opacity <= 1; opacity += 0.01) {
        await delay(30); // Adjust the delay as needed
        logo.style.opacity = opacity;
    }

    logo.style.opacity = 1;
}

async function showSpinner() {
    spinner.style.opacity = 1;
    await delay(2800);
    spinner.style.borderColor = '#bd66dd';
    await delay(1300);
}

async function fadeOut() {

    for (let opacity = 1; opacity >= 0; opacity -= 0.01) {
        await delay(15); // Adjust the delay as needed
        logo.style.opacity = opacity;
        spinner.style.opacity = opacity;
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    await fadeIn();
    await showSpinner();
    await fadeOut();
    window.location.href = 'mainMenu.html';
});