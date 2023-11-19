
let startTime = new Date();
startTime.setHours(20);
startTime.setMinutes(0);
startTime.setSeconds(0);

const STORY_DURATION = 5 * 1000;

window.onload = function() {

    // Create the main Img element
    let mainImg = document.createElement('img');
    mainImg.id = 'main-img';
    mainImg.src = 'assets/png/garage/garage_1_light.png';
    document.body.appendChild(mainImg);

    // Create the story-text element
    let storyText = document.createElement('div');
    storyText.id = 'story-text';
    storyText.textContent = 'Il était une fois, alors que la neige recouvrait doucement les rues de la ville de Montréal,' +
    ' un jeune enfant découvrit un étrange phénomène dans sa propre maison. \n' +
    'Des bruits mystérieux résonnaient à travers les couloirs sombres, et des ombres furtives dansaient dans les coins oubliés.\n' +
    'Il entreprit de rechercher l\'origine de ces perturbations nocturnes.' +
    'Armé de sa ténacité et de son esprit ingénieux, il entreprit de chasser le mystérieux monstre qui se cachait dans les recoins de sa demeure.';

    // Append the story-text element to the body
    document.body.appendChild(storyText);

    // Create the skip button
    let skipButton = document.createElement('button');
    skipButton.id = 'skip-button';
    skipButton.textContent = 'Skip';
    skipButton.addEventListener('click', function() {
        // Remove the story-text element, skip button, and main div
        document.body.removeChild(storyText);
        document.body.removeChild(skipButton);
        document.getElementById('main-img').classList.remove('filter');
        addClickEventToMainImage();
    });

    // Append the skip button to the body
    document.body.appendChild(skipButton);

    // Create the clock element
    let clock = document.createElement('div');
    clock.id = 'clock';
    document.body.appendChild(clock);

    // Call the updateClock function immediately
    updateClock();

    // Update the clock every minute
    setInterval(updateClock, 60000);

    // Fade in animation for main image
    setTimeout(function() {
        document.getElementById('main-img').classList.add('fade-in');
        document.getElementById('clock').classList.add('fade-in');
    }, 500);

    // Fade in animation for story text
    setTimeout(function() {
        document.getElementById('story-text').classList.add('fade-in');
        document.getElementById('skip-button').classList.add('fade-in');
        document.getElementById('main-img').classList.add('filter');
    }, 1000);

    // Fade out animation for story text
    setTimeout(function() {
        document.getElementById('story-text').classList.add('fade-out');
        document.getElementById('skip-button').classList.add('fade-out');
        document.getElementById('main-img').classList.remove('filter');
    }, STORY_DURATION - 1000); // Adjust the duration as needed

    // Progressive return animation
    setTimeout(function() {
        document.body.removeChild(storyText);
        document.body.removeChild(skipButton);
        addClickEventToMainImage();
    }, STORY_DURATION); // Adjust the duration as needed
};

// Function to update the clock display
function updateClock() {
    let hours = startTime.getHours();
    let minutes = startTime.getMinutes();
    let timeString = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
    clock.textContent = timeString;
    startTime.setMinutes(startTime.getMinutes() + 1);
}

// Function to add a click event listener to the main image
function addClickEventToMainImage() {
    let mainImg = document.getElementById('main-img');
    mainImg.addEventListener('click', function() {
        window.location.href = 'typing.html';
    });
}

