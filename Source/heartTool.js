function preload() {
    heart = loadImage("./assets/heart.png");
    sparkle = loadImage("./assets/sparkle.png"); // Load sparkle image
}

function HeartTool() {
    this.icon = "assets/heart.png";
    this.name = "heart";
    this.size = 20;
    let heartSizeSlider;
    let shapeSelector;

    this.draw = function () {
        if (mouseIsPressed) {
            var heartSize = heartSizeSlider.value();
            var xPos = mouseX - heartSize / 2;
            var yPos = mouseY - heartSize / 2;

            let selectedShape = shapeSelector.value(); // Get selected shape

            if (selectedShape === "heart") {
                image(heart, xPos, yPos, heartSize, heartSize);
            } else if (selectedShape === "sparkle") {
                image(sparkle, xPos, yPos, heartSize, heartSize);
            }
        }
    };

    this.populateOptions = function () {
        select(".options").html(`
            <div style="display: flex; align-items: center; gap: 15px;">
                <label for='sizeOfHeart'>Size: </label>
                <input id='sizeOfHeart' type='range' min='5' max='50' value='20' style='width: 120px; cursor: pointer;'>
                <span id='textSizeValue'>20</span>

                <label for='shapeSelector'>Shape: </label>
                <select id='shapeSelector' style='cursor: pointer;'>
                    <option value='heart'>Heart</option>
                    <option value='sparkle'>Sparkle</option>
                </select>
            </div>
        `);

        heartSizeSlider = select("#sizeOfHeart");
        shapeSelector = select("#shapeSelector");

        heartSizeSlider.input(() => {
            select("#textSizeValue").html(" " + heartSizeSlider.value());
        });
    };

    this.unselectTool = function () {
        select(".options").html(""); // Clear options
    };
}
