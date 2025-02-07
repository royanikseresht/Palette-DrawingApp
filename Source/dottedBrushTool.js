// DottedBrushTool.js
function DottedBrushTool(){
    // Set an icon and a name for the object
    this.icon = "assets/dottedbrush.png";
    this.name = "dottedBrush";

    this.draw = function(){
        // If the mouse is pressed, draw dots at the mouse location
        if(mouseIsPressed){
            let dotSize = random(3, 12); // Increased max size for variation
            let opacity = random(80, 255); // Expanded opacity range
            let jitterX = random(-10, 10); // More jitter for dynamic effect
            let jitterY = random(-10, 10);
            let colors = [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255), color(255, 255, 0)];
            let dotColor = random(colors); // Random color selection
            
            fill(red(dotColor), green(dotColor), blue(dotColor), opacity);
            noStroke();
            ellipse(mouseX + jitterX, mouseY + jitterY, dotSize, dotSize);
        }
    };
}