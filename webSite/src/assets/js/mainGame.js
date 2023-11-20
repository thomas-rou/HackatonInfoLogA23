// Array of image file names
const images = ['0_light.png', '1_light.png', '2_light.png', '3_light.png'];

// Preload images
const imageObjects = images.map(imageName => {
    const image = new Image();
    image.src = `assets/png/garage/${imageName}`;
    return image;
});

// Function to switch the image
function switchImage(direction) {
    const imgElement = document.getElementById('img');
    const currentImageIndex = images.indexOf(imgElement.src.split('/').pop());

    let newIndex;

    if (direction === 'left') {
        newIndex = (currentImageIndex - 1 + images.length) % images.length;
    } else if (direction === 'right') {
        newIndex = (currentImageIndex + 1) % images.length;
    }

    imgElement.src = imageObjects[newIndex].src;
}

// Function to update container size
function updateContainerSize() {
    // Get the image element
    var image = document.getElementById('img');

    // Get the container element
    var container = document.getElementById('container');

    // Set the container size based on the image size
    container.style.width = image.width + 'px';
    container.style.height = image.height + 'px';
}

function removeMonster() {
    let monsterImg = document.getElementById("monster");
    if (monsterImg) {
        monsterImg.parentNode.removeChild(monsterImg);
    }
}

function addMonster(x, y) {
    // Create a new img element
    let monsterImg = document.createElement("img");

    // Set attributes for the monster image
    monsterImg.src = "./assets/png/monster/monster_1.png"; // Replace with the actual path to your monster image
    monsterImg.alt = "Monster Image";
    monsterImg.id = "monster";

     // Set the size of the monster image
     monsterImg.style.width = "50px"; // Adjust the width as needed
     monsterImg.style.height = "50px"; // Adjust the height as needed
    
    // Set the style attributes to position the monster based on x and y values
    monsterImg.style.position = "absolute";
    monsterImg.style.left = x + "%";
    monsterImg.style.top = y + "%";

    // Attach a click event listener to the monster image
    monsterImg.addEventListener("click", function() {
        removeMonster();
        let randomX = Math.random() * 100;
        let randomY = Math.random() * 100;
        addMonster(randomX, randomY);

        // Delay the navigation by 100 milliseconds (adjust as needed)
        setTimeout(function() {
            window.location.href = "typing.html";
        }, 10);
    });

    // Append the monster image to the body
    document.body.appendChild(monsterImg);
}

function makeDraggable() {
    const draggableBox = document.getElementById('draggableBox');

    let isDragging = false;
    let initialObjectXpos, initialXpos;
    let initialObjectYpos, initialYpos;

    draggableBox.addEventListener('mousedown', (e) => {
        isDragging = true;

        initialObjectXpos = draggableBox.offsetLeft;
        initialObjectYpos = draggableBox.offsetTop;

        initialXpos = e.clientX
        initialYpos = e.clientY
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const xDiff = e.clientX - initialXpos;
            const yDiff = e.clientY - initialYpos;

            draggableBox.style.left = `${initialObjectXpos + xDiff}px`;
            draggableBox.style.top = `${initialObjectYpos + yDiff}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

function makeDraggableRightOnly() {
    //const draggableBox = document.getElementById('tire');
    const draggableBox = document.getElementById('draggableBox');
    //draggableBox.style.left = "100px"

    let isDragging = false;
    let initialObjectXpos, initialXpos;

    draggableBox.addEventListener('mousedown', (e) => {
        isDragging = true;

        initialObjectXpos = draggableBox.offsetLeft;
        initialXpos = e.clientX;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const xDiff = e.clientX - initialXpos;
            
            if (initialObjectXpos + xDiff >= initialObjectXpos) {
                draggableBox.style.left = `${initialObjectXpos + xDiff}px`;
            } else { 
                draggableBox.style.left = `${initialObjectXpos}px`;
            }
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        draggableBox.style.left = `${initialObjectXpos}px`; // Si le monstre est découvert, ne pas faire?
    });
}

// Initial update on page load
window.onload = () => {
    updateContainerSize();
    removeMonster();

    // Example usage: addMonster with random x and y values between 0 and 100
    let randomX = Math.random() * 100;
    let randomY = Math.random() * 100;
    addMonster(randomX, randomY);
    makeDraggableRightOnly()
};

// Update container size on window resize
window.addEventListener('resize', updateContainerSize);