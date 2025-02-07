//shapeMemoryGame.js
function ShapeMemoryGameTool() {
    // Set an icon and name for the tool
    this.icon = "assets/memory.png";
    this.name = "shapeMemoryGame";

    // Initialize game variables
    this.shapes = []; // Stores the displayed shapes
    this.userShapes = []; // Stores user-drawn shapes
    this.isDrawing = false;
    this.timer = 3; // Timer to show shapes before hiding
    this.startX = null;
    this.startY = null;

    // Select the canvas
    this.c = select("canvas");

    // Draw function
    this.draw = function () {
        background(255);

        // If showing the shapes, render them
        if (this.timer > 0) {
            fill(0);
            textSize(16);
            textAlign(CENTER, CENTER);
            text("Memorize these shapes!", width / 2, 30);

            noFill();
            stroke(255, 20, 147);
            this.shapes.forEach((shape) => {
                if (shape.type === "circle") {
                    ellipse(shape.x, shape.y, shape.size);
                } else if (shape.type === "rect") {
                    rect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size);
                }
            });

            fill(0);
            textSize(16);
            text(`Shapes disappear in: ${this.timer}s`, width / 2, height - 30);
        } else {
            // Allow the user to draw shapes after timer ends
            fill(0);
            textSize(16);
            textAlign(CENTER, CENTER);
            text("Draw the shapes you remember!", width / 2, 30);
text("Hold SHIFT to draw rectangles, release SHIFT to draw circles.", width / 2, 50);

            // Render user-drawn shapes
            noFill();
            stroke(0);
            this.userShapes.forEach((shape) => {
                if (shape.type === "circle") {
                    ellipse(shape.x, shape.y, shape.size);
                } else if (shape.type === "rect") {
                    rect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size);
                }
            });
        }
    };

    // Mouse pressed handler
    this.mousePressed = function () {
        if (this.timer <= 0 && this.mousePressOnCanvas(this.c)) {
            this.startX = mouseX;
            this.startY = mouseY;
            this.isDrawing = true;
        }
    };

    // Mouse released handler
    this.mouseReleased = function () {
        if (this.isDrawing) {
            this.isDrawing = false;
            let size = dist(this.startX, this.startY, mouseX, mouseY);

            // Determine shape type based on user input (e.g., circle by default)
            let shapeType = keyIsDown(SHIFT) ? "rect" : "circle"; // Future enhancement: let user select type

            this.userShapes.push({
                type: shapeType,
                x: this.startX,
                y: this.startY,
                size: size,
            });
        }
    };

    // Generate random shapes
    this.generateShapes = function () {
        this.shapes = [];
        for (let i = 0; i < 5; i++) { // Generate 5 random shapes
            let shapeType = random(["circle", "rect"]);
            this.shapes.push({
                type: shapeType,
                x: random(100, width - 100),
                y: random(100, height - 100),
                size: random(30, 80),
            });
        }
    };

    // Start the game
    this.startGame = function () {
        this.generateShapes();
        this.userShapes = [];
        this.timer = 3;

        // Countdown timer
        let countdown = setInterval(() => {
            this.timer--;
            if (this.timer <= 0) {
                clearInterval(countdown);
                updatePixels();
            }
        }, 1000);
    };

    // Compare shapes and calculate score
    this.calculateScore = function () {
        let score = 0;
        this.shapes.forEach((shape, index) => {
            if (this.userShapes[index]) {
                let userShape = this.userShapes[index];
                let distance = dist(shape.x, shape.y, userShape.x, userShape.y);
                let sizeDifference = abs(shape.size - userShape.size);

                // Scoring logic: position and size matching
                if (distance < 100 && sizeDifference < 40) {
                    score += 20; // 20 points per correctly drawn shape
                }
            }
        });
        return score;
    };

    // Populate options for starting and resetting the game
    this.populateOptions = function () {
        select(".options").html("<div id='generalBtns'></div>");

        const startBtn = createButton("Start Memory Game");
        startBtn.parent("#generalBtns");
        startBtn.mousePressed(() => {
            this.startGame();
        });

        const finishBtn = createButton("Finish and Score");
        finishBtn.parent("#generalBtns");
        finishBtn.mousePressed(() => {
            let finalScore = this.calculateScore();
            alert(`Your final score is: ${finalScore}/100`);
        });
    };

    // Clear options when tool is deselected
    this.unselectTool = function () {
        background(255);
        select("#generalBtns").html("");
        this.shapes = [];
        this.userShapes = [];
        this.timer = 0;
        this.startX = null;
        this.startY = null;
        this.isDrawing = false;
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
