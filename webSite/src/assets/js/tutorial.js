
// Event listener to the button
const button = document.querySelector('button[type="submit"]');
button.addEventListener('click', showTutorial);

// Event listener callback function
function showTutorial() {
    // Create a new element for the gray box
    const tutorialBox = document.createElement('div');

    // Set styles for the gray box
    tutorialBox.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    tutorialBox.style.opacity = '0.8';
    tutorialBox.style.position = 'fixed';
    tutorialBox.style.top = '0';
    tutorialBox.style.left = '0';
    tutorialBox.style.width = '100%';
    tutorialBox.style.height = '100%';

    // Add tutorial information to the gray box
    tutorialBox.innerHTML = `
        <div class="tutorial-content">
            <h2>Tutorial Information</h2>
            <p>This is the tutorial information.</p>
            <span class="close-icon">X</span>
        </div>
    `;

    // Set styles for the tutorial content
    const tutorialContent = tutorialBox.querySelector('.tutorial-content');
    tutorialContent.style.position = 'absolute';
    tutorialContent.style.top = '50%';
    tutorialContent.style.left = '50%';
    tutorialContent.style.transform = 'translate(-50%, -50%)';
    tutorialContent.style.backgroundColor = '#fff';
    tutorialContent.style.padding = '20px';
    tutorialContent.style.borderRadius = '5px';

    // Set styles for the close icon
    const closeIcon = tutorialBox.querySelector('.close-icon');
    closeIcon.style.position = 'absolute';
    closeIcon.style.top = '10px';
    closeIcon.style.right = '10px';
    closeIcon.style.cursor = 'pointer';

    // Event listener to close the tutorial box
    closeIcon.addEventListener('click', () => {
        tutorialBox.remove();
    });

    // Append the gray box to the container
    const container = document.querySelector('.container');
    container.appendChild(tutorialBox);
}
