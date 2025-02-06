function ScissorsTool() {
    this.icon = "assets/scissors.png";
    this.name = "Scissors";

    var startMouseX = -1, startMouseY = -1;
    var currentMouseX = -1, currentMouseY = -1;
    var selectRect = { x: 0, y: 0, w: 0, h: 0 };
    var selecting = false, selectImg = null, pasting = false;

    this.c = select("canvas");

    // Main Draw Function
    this.draw = function () {
        if (mouseIsPressed && !pasting && this.mousePressOnCanvas(this.c)) {
            if (startMouseX === -1) {
                // Start selection
                startMouseX = mouseX;
                startMouseY = mouseY;
                selecting = true;
                loadPixels(); // Save current canvas state
            } else {
                // Update selection rectangle while dragging
                currentMouseX = mouseX;
                currentMouseY = mouseY;
                updatePixels(); // Restore canvas to saved state
                noFill();
                stroke(128); // Grey border
                strokeWeight(2);
                rect(startMouseX, startMouseY, currentMouseX - startMouseX, currentMouseY - startMouseY);
            }
        } else if (selecting) {
            // Finalize selection when the mouse is released
            selecting = false;
            selectRect.x = min(startMouseX, currentMouseX);
            selectRect.y = min(startMouseY, currentMouseY);
            selectRect.w = abs(currentMouseX - startMouseX);
            selectRect.h = abs(currentMouseY - startMouseY);
            updatePixels(); // Restore canvas to saved state

            // Reset start positions
            startMouseX = -1;
            startMouseY = -1;
        }

        if (pasting && selectImg) {
            
            // Handle image pasting
            updatePixels(); // Clear leftover pixels
            noTint();
            rect(startMouseX, startMouseY, currentMouseX - startMouseX, currentMouseY - startMouseY);
            image(selectImg, mouseX - selectImg.width / 2, mouseY - selectImg.height / 2);
            
        }
    };

    this.mousePressed = function () {
        console.log("ScissorsTool mousePressed is active");  // Debugging line
        if (pasting && selectImg && this.mousePressOnCanvas(this.c)) {
            image(selectImg, mouseX - selectImg.width / 2, mouseY - selectImg.height / 2);
            pasting = false;
        }
    };


    this.populateOptions = function () {
        // Populate options in the UI
        select(".options").html("<div id='generalBtns'></div>");

        const cutBtn = createButton("Cut");
        cutBtn.class("tool-btn");
        cutBtn.parent("#generalBtns");
        cutBtn.mousePressed(() => {
            if (selectRect.w > 0 && selectRect.h > 0) {
                selectImg = get(selectRect.x, selectRect.y, selectRect.w, selectRect.h);
                noStroke();
                fill(255);
                rect(selectRect.x, selectRect.y, selectRect.w, selectRect.h); // Clear selected area
            }
        });

        const pasteBtn = createButton("Paste");
        pasteBtn.class("tool-btn");
        pasteBtn.parent("#generalBtns");

        // Update the button state based on whether an image is selected
        pasteBtn.mousePressed(() => {
            if (selectImg) {
                pasting = true;
                pasteBtn.attribute("disabled", true);  // Disable button once paste starts
                setTimeout(() => {
                    pasteBtn.removeAttribute("disabled");  // Re-enable button after pasting
                }, 100);  // Disable the button for a short time after pressing, to avoid repeated pasting
            } else {
                console.log("No image selected for pasting.");  // Optional debug log
            }
        });


        const resetBtn = createButton("Reset Selection");
        resetBtn.class("tool-btn");
        resetBtn.parent("#generalBtns");
        resetBtn.mousePressed(() => {
            // Reset selection and clear canvas states
            selectRect = { x: 0, y: 0, w: 0, h: 0 };
            selectImg = null;
            pasting = false;
            updatePixels(); // Revert canvas to original state
        });
    };

    this.mousePressOnCanvas = function (canvas) {
        // Validate mouse position within canvas bounds
        const bounds = canvas.elt.getBoundingClientRect();
        return (
            mouseX > bounds.left &&
            mouseX < bounds.right &&
            mouseY > bounds.top &&
            mouseY < bounds.bottom
        );
    };

    this.unselectTool = function () {
        console.log("ScissorsTool unselected");
        selecting = false;
        pasting = false;
        selectImg = null;
        updatePixels();
        select(".options").html(""); // Remove UI elements if any
    };
}
