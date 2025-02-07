function TextTool() {
    this.icon = "assets/text.png";
    this.name = "Text Tool";
    this.textSize = 20;
    let textSizeSlider, textInput;

    this.draw = function () {
        if (mouseIsPressed && textInput.value().trim() !== "") {
            fill(0);
            textSize(this.textSize);
            text(textInput.value(), mouseX, mouseY);
        }
    };

    this.populateOptions = function () {
        select(".options").html(
            `<div style="display: flex; align-items: center;">
                <label for='textInput'>Enter Text: </label>
                <input id='textInput' type='text' style='width: 120px; margin-right: 10px;'>
                <label for='textSize'>Text Size: </label>
                <input id='textSize' type='range' min='10' max='100' value='20' style='width: 120px; cursor: pointer;'>
                <span id='textSizeValue'> 20</span>
            </div>`
        );

        textInput = select("#textInput");
        textSizeSlider = select("#textSize");

        textSizeSlider.input(() => {
            this.textSize = textSizeSlider.value();
            select("#textSizeValue").html(" " + this.textSize);
        });
    };

    this.unselectTool = function () {
        select(".options").html(""); // Clear options when switching tools
    };
}
