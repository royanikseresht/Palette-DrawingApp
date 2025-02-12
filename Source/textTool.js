//textTool.js
function TextTool() {
    this.icon = "assets/text.png";
    this.name = "Text Tool";
    this.textSize = 20;
    let textSizeSlider, textInput;

    // Function to draw text on the canvas
    this.draw = function () {
        if (mouseIsPressed && textInput.value().trim() !== "") {
            fill(0);  // Set the text color to black
            textSize(this.textSize);  // Set the text size
            text(textInput.value(), mouseX, mouseY);  // Draw the text at the mouse location
        }
    };

    // Function to populate the tool options (input fields and sliders)
    this.populateOptions = function () {
        select(".options").html(
            `<div style="display: flex; align-items: center;">
                <label for='textInput'>Enter Text: </label>
                <input id='textInput' type='text' style='width: 120px; margin-right: 10px;' placeholder="Type here">
                <label for='textSize'>Text Size: </label>
                <input id='textSize' type='range' min='10' max='100' value='20' style='width: 120px; cursor: pointer;'>
                <span id='textSizeValue'> 20</span>
            </div>`
        );

        textInput = select("#textInput");
        textSizeSlider = select("#textSize");

        // Update the text size dynamically when the slider changes
        textSizeSlider.input(() => {
            this.textSize = textSizeSlider.value();
            select("#textSizeValue").html(" " + this.textSize);
        });

        // Optional: Focus the input field when the text tool is activated for convenience
        textInput.elt.focus();
    };

    // Function to clear the options (when switching tools)
    this.unselectTool = function () {
        select(".options").html("");  // Clear all options
    };
}

