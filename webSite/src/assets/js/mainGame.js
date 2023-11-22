// Array of image file names
const images = ['0_light.png', '1_light.png', '2_light.png', '3_light.png'];

// Représente l'array JSON. Pense pas que c'est une bonne méthode d'implémentation
let house;

let monsterLocation = {
    "roomIndex": null,
    "viewIndex": null,
    "position": null,
    "monsterIndex": null
};

const newUser = {
    "room" : 2,
    "view" : 0,
    "monster" : 0
};

let user = newUser;

let imageObjects = []

function generateImgRoom() {
    imageObjects = [];
    for (let i = 0; i < house[user.room].views.length; i++) {
        const image = new Image();
        image.src = `assets/png/${house[user.room].name}/${i}.png`;
        imageObjects.push(image)
    }
}

function generateView(){
    removeDoor();
    removeMonster();
    removeObjects();

    //Change image
    const imgElement = document.getElementById('image');
    imgElement.href = imageObjects[user.view].src;

    // Add monster
    if (user.room === monsterLocation.roomIndex && user.view === monsterLocation.viewIndex) {
        let position = monsterLocation.position;
        addMonster(position.x, position.y, position.height, position.width);
    }

    // Add door
    const doors = house[user.room].views[user.view].doors;
    if (doors) {
        doors.forEach(function(door) {
            generateDoor(door.x, door.y, door.roomIndex, door.view);
        });
    }

}

function switchView(direction){
    const length = house[user.room].views.length;
    if (direction === 'left') {
        user.view = (user.view - 1 + length) % length;
    } else if (direction === 'right') {
        user.view= (user.view + 1) % length;
    }
    generateView();
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

function removeObjects() {
    let monsterImg = document.getElementById("monster");
    if (monsterImg) {
        monsterImg.parentNode.removeChild(monsterImg);
    }
}

function removeDoor(){
    let doors = document.getElementsByClassName("door");
    if (doors) {
        let doorsArray = Array.from(doors);

        doorsArray.forEach(function(door) {
            door.parentNode.removeChild(door);
        });
    }
}

function generateDoor(x, y, roomIndex, view){
     // Create a div element
     var iconElement = document.createElement('iconify-icon');
     iconElement.classList.add("door");


     // Set the x and y position of the icon
     iconElement.style.position = 'absolute';
     iconElement.style.left = x+'%';
     iconElement.style.top = y+'%';

     iconElement.setAttribute('icon', 'fa6-solid:door-open');
     iconElement.setAttribute('width', '100%');
     iconElement.style.width = '10%';


     iconElement.style.color = 'white';

     // Attach a click event listener to the monster image
     iconElement.addEventListener("click", function() {
        user.room = roomIndex;
        user.view = view;
        generateImgRoom()
        generateView();
     });

     // Append the monster image to the body
     document.getElementById("container").appendChild(iconElement);
}

function generateMonster() {
    let randomRoom = Math.floor(Math.random() * house.length);
    let roomObject = house[randomRoom];
    let randomView = Math.floor(Math.random() * roomObject.views.length);
    let viewObject = roomObject.views[randomView];
    let randomPosition = Math.floor(Math.random() * viewObject.locations.length);
    let positionObject = viewObject.locations[randomPosition];

    let randomMonster = Math.floor(Math.random() * 5 + 1); // hardcoded

    monsterLocation.roomIndex = randomRoom;
    monsterLocation.viewIndex = randomView;
    monsterLocation.position = positionObject;
    monsterLocation.monsterIndex = randomMonster;
}

function addMonster(x, y, width, height) {

    let monsterImg = document.createElement("img");

    // Set attributes for the monster image
    monsterImg.src = `./assets/png/monster/monster_${monsterLocation.monsterIndex}.png`; // Replace with the actual path to your monster image
    monsterImg.alt = "Monster Image";
    monsterImg.id = "monster";

    // Set the size of the monster image
    monsterImg.style.height =  Math.min(width, height) * 8/10 + "%"; // Adjust the width as needed

    // Set the style attributes to position the monster based on x and y values
    monsterImg.style.position = "absolute";
    monsterImg.style.left = (x + width / 2) + "%";
    monsterImg.style.top = (y + height / 2) + "%";

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
    document.getElementByTagName("body").appendChild(monsterImg);
}

async function fetchData() {
    return new Promise((resolve, reject) => {
        fetch('./assets/json/house.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                console.error('Error fetching JSON:', error);
                reject(error);
            });
    });
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

// Initial update on page load
window.onload = () => {
    updateContainerSize();
    removeMonster();

    fetchData().then(data => {
        house = data[0].rooms;
        user =  data[0].user;


        // Retrieve the JSON string from local storage
        let storedUserJSON = sessionStorage.getItem("userData");
        if (storedUserJSON !== null) {
            user = JSON.parse(storedUserJSON);
            console.log("has a local storage");
        }

        console.log("Nombre de monstres vaincus : ", user.monster);
        if(user.monster >= 3){
            let userJSON = JSON.stringify(newUser);
            sessionStorage.setItem("userData", userJSON);

            window.location.href = "endStory.html"
        }

        generateImgRoom()
        generateMonster()
        generateView();
    })
    .catch(error => {
        console.error('Error in fetchData:', error);
    });

    makeDraggableRightOnly()
};

// Update container size on window resize
window.addEventListener('resize', updateContainerSize);