let currentImage;
let isDragging = false;
let startX, startY, startLeft, startTop;

function openFileInput() {
    document.getElementById('fileElem').click();
}

function handleFileInputChange(event) {
    const files = event.target.files;
    const dropArea = document.getElementById("drop-area");

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement("img");
                img.src = e.target.result;
                dropArea.innerHTML = "";
                dropArea.appendChild(img);
                currentImage = img;
                currentImage.addEventListener("click", addText); // Add click event listener to the image
                img.style.position = "relative"; // Set position relative for proper text positioning
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please select only image files.");
        }
    }
}

function addText(event) {
    const text = prompt("Enter text:");
    if (text !== null && text.trim() !== "") {
        const span = document.createElement("span");
        span.contentEditable = true;
        span.innerText = text;
        span.style.position = "absolute"; // Set position absolute to overlay on the image
        span.style.left = `${event.offsetX}px`; // Position the text at the click coordinates relative to the image
        span.style.top = `${event.offsetY}px`;
        span.style.cursor = "move"; // Change cursor to indicate draggable element
        span.addEventListener("mousedown", startDragging);
        currentImage.parentNode.appendChild(span);

        // Apply text customization options
        const fontFamily = document.getElementById("font-family").value;
        const fontSize = document.getElementById("font-size").value + "px";
        const fontColor = document.getElementById("font-color").value;
        span.style.fontFamily = fontFamily;
        span.style.fontSize = fontSize;
        span.style.color = fontColor;
    }
}

function startDragging(event) {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    const span = event.target;
    startLeft = parseFloat(span.style.left);
    startTop = parseFloat(span.style.top);
    document.addEventListener("mousemove", dragText);
    document.addEventListener("mouseup", stopDragging);
    event.preventDefault(); // Prevent default behavior (text selection) when dragging
}

function dragText(event) {
    if (!isDragging) return;
    const span = event.target;
    const offsetX = event.clientX - startX;
    const offsetY = event.clientY - startY;
    span.style.left = `${startLeft + offsetX}px`;
    span.style.top = `${startTop + offsetY}px`;
}

function stopDragging() {
    isDragging = false;
    document.removeEventListener("mousemove", dragText);
    document.removeEventListener("mouseup", stopDragging);
}

function dragOverHandler(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
}

function dropHandler(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const dropArea = document.getElementById("drop-area");

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement("img");
                img.src = e.target.result;
                dropArea.innerHTML = "";
                dropArea.appendChild(img);
                currentImage = img;
                currentImage.addEventListener("click", addText); // Add click event listener to the image
                img.style.position = "relative"; // Set position relative for proper text positioning
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please drop only image files.");
        }
    }
}
