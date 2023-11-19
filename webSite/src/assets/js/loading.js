async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fadeIn() {
    const logo = document.querySelector('#logo');
    while (logo.opacity != 1) {}
}

async function showSpinner() {
    const spinner = document.querySelector('.spinner');
    spinner.style.opacity = 1;
    await delay(3000);
}

document.addEventListener("DOMContentLoaded", async function () {
    await fadeIn();
    await showSpinner();
    window.location.href = 'mainMenu.html';
});