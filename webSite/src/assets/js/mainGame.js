
let currentImageIndex = 0;

let monsterLocation = {
    "room": 0,
    "view": 0,
    "location": null,
    "monsterIndex": 1 // TEMP
}

// Function to switch the image
function switchImage(direction) {
    const imgElement = document.getElementById('img');
    const imgCount = 4;
    
    if (direction === 'left') {
        currentImageIndex = (currentImageIndex - 1 + imgCount) % imgCount;
    } else if (direction === 'right') {
        currentImageIndex = (currentImageIndex + 1) % imgCount;
    }

    imgElement.src = `assets/png/garage/${currentImageIndex}.png`;
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

function addMonster(x, y, width, height) {

    // Create a new img element
    let monsterImg = document.createElement("img");

    // Set attributes for the monster image
    monsterImg.src = `./assets/png/monster/monster_${monsterLocation.monsterIndex}.png`; // Replace with the actual path to your monster image
    monsterImg.alt = "Monster Image";
    monsterImg.id = "monster";

    // Set the size of the monster image
    monsterImg.style.height =  Math.min(width, height) * 8/10 + "%"; // Adjust the width as needed
    
    // Set the style attributes to position the monster based on x and y values
    monsterImg.style.position = "absolute";
    monsterImg.style.left = (x + width/2) + "%";
    monsterImg.style.top = (y + height/2) + "%";

    // Attach a click event listener to the monster image
    monsterImg.addEventListener("click", function() {
        // Convert the user object to a JSON string
        user.monster++;
        let userJSON = JSON.stringify(user);
        sessionStorage.setItem("userData", userJSON);

        let miniGameIndex = Math.floor(Math.random() * 2);
        let miniGamePath = "";

        if ( miniGameIndex === 0 ){
            miniGamePath = "typing.html";
        } else if ( miniGameIndex === 1 ) {
            miniGamePath = "pattern.html";
        }

        // Delay the navigation by 100 milliseconds (adjust as needed)
        setTimeout(function() {
            
            window.location.href = miniGamePath + "?monsterIndex=" + encodeURIComponent(monsterLocation.monsterIndex) 
            + "&roomName=" + encodeURIComponent(house[user.room].name) + "&viewIndex=" + encodeURIComponent(user.view);
        }, 10);
    });

    // Append the monster image to the body
    document.getElementById("container").appendChild(monsterImg); 
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
    const tireImg = document.getElementById('tire');
    const draggableBox = document.getElementsByClassName('draggable')[0]; // objet invisible entourant l'endroit de la sélection

    let isDragging = false;
    let inEvidence = 0;
    let initialObjectXpos, initialXpos;


    draggableBox.addEventListener('mousedown', (e) => {
        isDragging = true;
        inEvidence++;
        checkEvidence();
        initialObjectXpos = 0.5;
        initialXpos = e.clientX;
    });

    draggableBox.addEventListener('mouseover', (e) => {
        inEvidence++;
        checkEvidence();
    });

    draggableBox.addEventListener('mouseleave', (e) => {
        inEvidence--;
        checkEvidence();
    })

    const mouseupHandler =  () => {
        isDragging = false;
        inEvidence--;
        checkEvidence();
        tireImg.style.left = `${initialObjectXpos * 100}%`;
    };

    const mousemoveHandler = (e) => {
        if (isDragging) {
            const xDiff = (e.clientX - initialXpos) / window.innerWidth;
            const maxOffset = draggableBox.clientWidth / window.innerWidth * 100;
            if (initialObjectXpos + xDiff >= initialObjectXpos) {
                if (initialObjectXpos * 100 + maxOffset <= (initialObjectXpos + xDiff) * 100) {
                    tireImg.style.left = `${initialObjectXpos * 100 + maxOffset}%`;
                    document.removeEventListener('mousemove', mousemoveHandler);
                    document.removeEventListener('mouseup', mouseupHandler)
                    window.location.href = "typing.html"; // TEMPORARY
                } else { 
                    tireImg.style.left = `${(initialObjectXpos + xDiff) * 100}%`;
                }
            } else {
                tireImg.style.left = `${initialObjectXpos * 100}%`;
            }
        }
    };

    document.addEventListener('mousemove', mousemoveHandler);
    document.addEventListener('mouseup', mouseupHandler);


    function checkEvidence()
    {
        if (inEvidence <= 0)
        {
            inEvidence = 0;
            tireImg.style.filter = 'brightness(100%)';
        } else {
            tireImg.style.filter = 'brightness(150%)';
        }
    }
}


//Initial update on page load
window.onload = () => {
    updateContainerSize();
    // removeMonster();

    // // Example usage: addMonster with random x and y values between 0 and 100
    // let randomX = Math.random() * 100;
    // let randomY = Math.random() * 100;
    // addMonster(randomX, randomY);
    addMonster(5.1, 38, 14.5, 8.8); // data from tire 
    makeDraggableRightOnly()
};

// Update container size on window resize
window.addEventListener('resize', updateContainerSize);