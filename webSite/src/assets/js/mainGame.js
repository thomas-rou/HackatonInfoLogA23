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

// Initial update on page load
window.onload = updateContainerSize;

// Update container size on window resize
window.addEventListener('resize', updateContainerSize);