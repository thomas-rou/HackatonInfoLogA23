async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fadeIn() {
    const logo = document.querySelector('#logo');
    await delay(3500);
}

async function showSpinner() {
    const spinner = document.querySelector('.spinner');
    spinner.style.opacity = 1;
    await delay(2500);
}

document.addEventListener("DOMContentLoaded", async function () {
    await fadeIn();
    await showSpinner();
    window.location.href = 'mainMenu.html';
});