function searchLight(){
window.addEventListener("load", function() {
    const img = document.getElementsByTagName("image")[0];
    const imgPos = img.getBoundingClientRect();
    const imgX = imgPos.left;
    const imgY = imgPos.top;
    const circle = document.getElementsByTagName("circle")[0];
    img.addEventListener("mousemove", function(e) {
        circle.setAttribute("cx", e.clientX - imgX);
        circle.setAttribute("cy", e.clientY - imgY);
        img.style.setProperty("--cursorX", e.clientX - imgX);
        img.style.setProperty("--cursorY", e.clientY - imgY);
        }, false);
}, false);
}

searchLight();