// eraserTool.js
function EraserTool() {
    this.icon = "assets/eraser.png";
    this.name = "Eraser";
    this.eraserSize = 20;

    this.draw = function() {
        // If the mouse is pressed, act as an eraser
        if (mouseIsPressed) {
            stroke(255);
            strokeWeight(this.eraserSize);
            line(pmouseX, pmouseY, mouseX, mouseY);
        }
        // Reset fill and stroke state after drawing
        fill(255); // Reset fill
        stroke(0); // Reset stroke
        strokeWeight(1); // Reset stroke weight
    };

    this.populateOptions = function() {
        select(".options").html("<label for='eraserSize'>Eraser Size: </label><input id='eraserSize' type='range' min='5' max='50' value='20' style='width: 150px; cursor: pointer;'><span id='textSizeValue'> 20</span>");
        select("#eraserSize").input(() => {
            this.eraserSize = select("#eraserSize").value();
            select("#textSizeValue").html(" " + this.eraserSize);
        });
    };
    
    this.unselectTool = function() {
        select(".options").html(""); // Clear options when switching tools
    };
}
