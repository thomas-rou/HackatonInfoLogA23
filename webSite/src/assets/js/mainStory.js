let startTime = new Date();
startTime.setHours(20);
startTime.setMinutes(0);
startTime.setSeconds(0);

window.onload = function() {
    // Progressive darkening animation
    document.body.classList.add('darken');

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
        // Remove the story-text element and skip button
        document.body.removeChild(storyText);
        document.body.removeChild(skipButton);
        // Remove the darken class to return the window to normal
        document.body.classList.remove('darken');
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

    // Fade in animation for story text
    setTimeout(function() {
        document.getElementById('story-text').classList.add('fade-in');
        document.getElementById('skip-button').classList.add('fade-in');
    }, 1000); // Adjust the delay as needed

    // Fade out animation for story text
    setTimeout(function() {
        document.getElementById('story-text').classList.add('fade-out');
        document.getElementById('skip-button').classList.add('fade-out');
    }, 14000); // Adjust the duration as needed

    // Progressive return animation
    setTimeout(function() {
        document.body.classList.remove('darken');
        document.body.removeChild(storyText);
        document.body.removeChild(skipButton);
    }, 15000); // Adjust the duration as needed
};

// Function to update the clock display
function updateClock() {
    let hours = startTime.getHours();
    let minutes = startTime.getMinutes();
    let timeString = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
    clock.textContent = timeString;
    startTime.setMinutes(startTime.getMinutes() + 1);
}
