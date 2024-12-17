//circleDrawGame.js
function CircleDrawingGameTool() {
    // Set an icon and name for the tool
    this.icon = "assets/circle.png";
    this.name = "circleGame";
    this.startX = null;
    this.startY = null;
    this.isDrawing = false;
    this.perfectCircle = null;
    this.score = null;

    // Select the canvas
    this.c = select("canvas");

    // Draw function
    this.draw = function () {
        noFill();
        updatePixels();

        // If the perfect circle exists, draw it as a reference
        if (this.perfectCircle) {
            stroke(255, 20, 147); 
            ellipse(
                this.perfectCircle.x,
                this.perfectCircle.y,
                this.perfectCircle.radius * 2
            );
        }

        // If the user is currently drawing, draw their circle in progress
        if (this.isDrawing) {
            stroke(0);
            let radius = dist(this.startX, this.startY, mouseX, mouseY);
            ellipse(this.startX, this.startY, radius * 2);
        }

        // Display the score if available
        if (this.score !== null) {
            fill(255, 20, 147);
            textSize(16);
            textAlign(CENTER, CENTER);
            text(`Your score: ${this.score}/100`, width / 2, height - 30);
        }
    };

    // Mouse pressed handler
    this.mousePressed = function () {
        if (this.mousePressOnCanvas(this.c)) {
            this.startX = mouseX;
            this.startY = mouseY;
            this.isDrawing = true;
        }
    };

    // Mouse released handler
    this.mouseReleased = function () {
        if (this.isDrawing) {
            this.isDrawing = false;

            // Calculate user-drawn circle radius
            let userRadius = dist(this.startX, this.startY, mouseX, mouseY);

            // Calculate the score based on the perfect circle
            this.score = this.calculateScore(
                this.startX,
                this.startY,
                userRadius,
                this.perfectCircle
            );
        }
    };

    // Generate a random perfect circle
    this.generatePerfectCircle = function () {
        this.perfectCircle = {
            x: random(100, width - 100),
            y: random(100, height - 100),
            radius: random(30, 100),
        };
    };

    // Calculate the score
    this.calculateScore = function (startX, startY, userRadius, perfectCircle) {
        let centerDistance = dist(startX, startY, perfectCircle.x, perfectCircle.y);
        let radiusDifference = abs(userRadius - perfectCircle.radius);

        let centerScore = max(0, 50 - centerDistance); // Max 50 points for center alignment
        let radiusScore = max(0, 50 - radiusDifference); // Max 50 points for radius match

        return Math.round(centerScore + radiusScore);
    };

    // Adds buttons to reset and start a new game
    this.populateOptions = function () {
        // Create a container for buttons
        select(".options").html("<div id='circleGameBtns'></div>");

        // Button to start a new challenge
        const newChallengeBtn = createButton("New Circle Challenge");
        newChallengeBtn.parent("#circleGameBtns");
        newChallengeBtn.mousePressed(() => {
            this.generatePerfectCircle();
            this.score = null;
            updatePixels();
        });

        // Button to clear the canvas
        const clearBtn = createButton("Clear Canvas");
        clearBtn.parent("#circleGameBtns");
        clearBtn.mousePressed(() => {
            this.score = null;
            this.perfectCircle = null;
            updatePixels();
        });
    };

    // Clear options when the tool is deselected
    this.unselectTool = function () {
        select("#circleGameBtns").html("");
        this.startX = null;
        this.startY = null;
        this.isDrawing = false;
        this.perfectCircle = null;
        this.score = null;

        // Reset the canvas background to white when the tool is deselected
        background(255); // 255 is the color value for white
};


    // Check if the mouse is pressed on the canvas
    this.mousePressOnCanvas = function (canvas) {
        if (
            mouseX > canvas.elt.offsetLeft &&
            mouseX < canvas.elt.offsetLeft + canvas.width &&
            mouseY > canvas.elt.offsetTop &&
            mouseY < canvas.height
        ) {
            return true;
        }
        return false;
    };
}
