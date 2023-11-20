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

function addMonster(x, y, width, height) {
    // Create a new img element
    let monsterImg = document.createElement("img");

    // Set attributes for the monster image
    monsterImg.src = "./assets/png/monster/monster_1.png"; // Replace with the actual path to your monster image
    monsterImg.alt = "Monster Image";
    monsterImg.id = "monster";

     // Set the size of the monster image
     monsterImg.style.width =  Math.min(width, height) + "%"; // Adjust the width as needed
    
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



let rooms; // Declare a variable to store the JSON data

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

    fetchData() .then(rooms => {
        console.log('Rooms:', rooms);


        let randomRoom = Math.floor(Math.random() * rooms.length);
        let room = rooms[randomRoom];
        let randomView = Math.floor(Math.random() * room.views.length);
        let view = room.views[randomView];
        let radomLocation = Math.floor(Math.random() * view.locations.length);
        let location = view.locations[radomLocation]
        addMonster(location.x, location.y, location.height, location.width);


    })
    .catch(error => {
        console.error('Error in fetchData:', error);
    });
}

// Update container size on window resize
window.addEventListener('resize', updateContainerSize);