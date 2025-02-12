// imageTool.js
function ImageTool() {
    this.icon = "assets/camera.png";
    this.name = "imageTool";
    
    let img = null; // Stores the uploaded image
    let inputButton; // File input button
    let widthSlider, heightSlider; // Sliders for resizing
    let imgWidth = 200, imgHeight = 200; // Default image size
    let imgX = 0, imgY = 0; // Image position

    this.draw = function() {
        background(255); // Clear canvas without affecting other drawings
        if (img) {
            image(img, imgX, imgY, imgWidth, imgHeight);
        }
    };

    this.populateOptions = function() {
        select(".options").html("<div id='imageOptions'></div>");
        
        inputButton = createFileInput(handleFile);
        inputButton.parent("#imageOptions");
        
        widthSlider = createSlider(50, width, imgWidth);
        widthSlider.input(updateSize);
        widthSlider.parent("#imageOptions");
        
        heightSlider = createSlider(50, height, imgHeight);
        heightSlider.input(updateSize);
        heightSlider.parent("#imageOptions");
    };
    
    function handleFile(file) {
        if (file.type === 'image') {
            img = loadImage(file.data, function() {
                imgWidth = img.width / 2; // Initialize to half the image's natural width
                imgHeight = img.height / 2; // Initialize to half the image's natural height
                widthSlider.value(imgWidth); // Update the slider to the new size
                heightSlider.value(imgHeight); // Update the slider to the new size
                redraw(); // Ensure the canvas is redrawn after loading
            });
        }
    }
    
    function updateSize() {
        imgWidth = widthSlider.value();
        imgHeight = heightSlider.value();
        redraw(); // Calls the global draw() function to refresh only once
    }

    this.unselectTool = function() {
        select("#imageOptions").html("");
    };
}
