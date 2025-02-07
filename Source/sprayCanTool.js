function SprayCan () {
    this.name = "sprayCanTool";
    this.icon = "assets/sprayCan.png";
    
    var points = 20; // Increased density for richer effect
    var spread = 15; // Increased spread for a wider spray pattern
    
    this.draw = function(){
        if(mouseIsPressed){
            for(var i = 0; i < points; i++){
                let sprayX = random(mouseX - spread, mouseX + spread);
                let sprayY = random(mouseY - spread, mouseY + spread);
                let opacity = random(50, 150); // Adding transparency variation
                let colors = [color(255, 0, 0, opacity), color(0, 255, 0, opacity), color(0, 0, 255, opacity), color(255, 255, 0, opacity)];
                let sprayColor = random(colors);
                
                stroke(sprayColor);
                strokeWeight(random(1, 3)); // Varying point size for texture
                point(sprayX, sprayY);
            }
        }
    }
};