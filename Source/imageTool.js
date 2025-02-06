function ImageTool() {
    this.icon = "assets/imageTool.png";
    this.name = "imageTool";
    
    let img = null; // Stores the uploaded image
    let inputButton; // File input button
    let widthSlider, heightSlider; // Sliders for resizing
    let imgWidth = 200, imgHeight = 200; // Default image size
    let imgX = 0, imgY = 0; // Image position
    let lastMouseX = -1, lastMouseY = -1;

    this.draw = function() {
        clear(); // Clears the canvas before drawing the image
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
                imgWidth = img.width / 2;
                imgHeight = img.height / 2;
                widthSlider.value(imgWidth);
                heightSlider.value(imgHeight);
                redraw(); // Redraw canvas after image loads
            });
        }
    }
    
    function updateSize() {
        imgWidth = widthSlider.value();
        imgHeight = heightSlider.value();
        redraw();
    }

    this.unselectTool = function() {
        select("#imageOptions").html("");
    };
}