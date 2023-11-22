// Array of image file names
const images = ['0_light.png', '1_light.png', '2_light.png', '3_light.png'];

// Représente l'array JSON. Pense pas que c'est une bonne méthode d'implémentation
let house;

let monsterLocation = {
    "room": 0,
    "view": 0,
    "location": null,
    "monsterIndex": 0
}

const newUser = {
    "room" : 2,
    "view" : 0,
    "monster" : 0
};

let user = newUser;

// Preload images
let imageObjects = []

function generateImgRoom() {
    imageObjects = [];
    for (let i = 0; i < house[user.room].views.length; i++) {
        const image = new Image();
        image.href = `assets/png/${house[user.room].name}/${i}.png`;
        imageObjects.push(image)
    }
}

function generateView(){
    removeDoor();
    removeMonster();
    removeObjects();

    //Change image
    const imgElement = document.getElementById('front-image');
    document.body.style.backgroundImage = `url(${imageObjects[user.view].href})`;
    imgElement.href.baseVal = imageObjects[user.view].href;


    // Add monster
    if (user.room === monsterLocation.room && user.view === monsterLocation.view) {
        let location = monsterLocation.location;
        addMonster(location.x, location.y, location.height, location.width);
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
    const image = document.getElementById('front-image');

    // Get the container element
    const container = document.getElementById('container');

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
    let room = house[randomRoom];
    let randomView = Math.floor(Math.random() * room.views.length);
    let view = room.views[randomView];
    let randomLocation = Math.floor(Math.random() * view.locations.length);
    let location = view.locations[randomLocation]
    location.monster = true;

    let monsterIndex = Math.floor(Math.random() * 5 + 1);
    monsterLocation.monsterIndex = monsterIndex;

    monsterLocation.location = location;
    monsterLocation.room = 2;
    monsterLocation.view = 0;
}

function addMonster(x, y, width, height) {

    // Create a new img element
    let monsterImg = document.createElement("img");

    // Set attributes for the monster image
    monsterImg.src = `./assets/png/monster/monster_${monsterLocation.monsterIndex}.png`; // Replace with the actual path to your monster image
    monsterImg.alt = "Monster Image";
    monsterImg.id = "monster";

     // Set the size of the monster image
     monsterImg.style.width = 8 + "%"; // Adjust the width as needed

    // Set the style attributes to position the monster based on x and y values
    monsterImg.style.position = "absolute";
    monsterImg.style.left = x + "%";
    monsterImg.style.top = y + "%";

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
};

// Update container size on window resize
window.addEventListener('resize', updateContainerSize);
