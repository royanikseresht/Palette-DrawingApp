function StarBrushTool(){
    this.icon = "assets/starbrush.png";
    this.name = "starBrush";
    
    this.draw = function(){
        if(mouseIsPressed){
            let starSize = random(5, 20);
            let opacity = random(100, 255);
            let colors = [color(255, 215, 0), color(173, 216, 230), color(255, 105, 180), color(144, 238, 144)];
            let starColor = random(colors);
            
            fill(red(starColor), green(starColor), blue(starColor), opacity);
            noStroke();
            
            drawStar(mouseX, mouseY, starSize, starSize / 2, 5);
        }
    };
    
    function drawStar(x, y, radius1, radius2, npoints) {
        let angle = TWO_PI / npoints;
        let halfAngle = angle / 2.0;
        beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
            let sx = x + cos(a) * radius1;
            let sy = y + sin(a) * radius1;
            vertex(sx, sy);
            sx = x + cos(a + halfAngle) * radius2;
            sy = y + sin(a + halfAngle) * radius2;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    }
}