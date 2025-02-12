//scissorsTool.js
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
            updatePixels(); // Clear leftover pixels
            image(selectImg, mouseX - selectImg.width / 2, mouseY - selectImg.height / 2);
        }

    };

    this.mousePressed = function () {
        if (pasting && selectImg && this.mousePressOnCanvas(this.c)) {
            image(selectImg, mouseX - selectImg.width / 2, mouseY - selectImg.height / 2);
            pasting = false;  // Ensure pasting stops
            selectImg = null; // Reset selection after pasting
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

                // Correct way to erase the selection
                loadPixels();  // Save current state
                for (let i = selectRect.x; i < selectRect.x + selectRect.w; i++) {
                    for (let j = selectRect.y; j < selectRect.y + selectRect.h; j++) {
                        set(i, j, color(255, 255, 255));  // Set pixels to white
                    }
                }
                updatePixels();  // Apply changes
            }
        });


        const pasteBtn = createButton("Paste");
        pasteBtn.class("tool-btn");
        pasteBtn.parent("#generalBtns");

        // Update the button state based on whether an image is selected
        pasteBtn.mousePressed(() => {
            if (selectImg) {
                pasting = true;
                pasteBtn.attribute("disabled", true);  // Disable during pasting
            } else {
                console.log("No image selected for pasting.");
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
        const bounds = canvas.elt.getBoundingClientRect();
        return (
            mouseX > bounds.left + window.scrollX &&
            mouseX < bounds.right + window.scrollX &&
            mouseY > bounds.top + window.scrollY &&
            mouseY < bounds.bottom + window.scrollY
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
