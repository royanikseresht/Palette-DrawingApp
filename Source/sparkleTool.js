//sparkleTool.js
function preload() {
    sparkle = loadImage("./assets/sparkle.jpg");
  }
  
  function SparkleTool() {
    //set an icon and a name for the object
    this.icon = "assets/sparkle.jpg";
    this.name = "sparkle";
    this.size = 20;
  
    this.draw = function () {
  
      var sparkleSize = sparkleSizeSlider.value();
      //if the mouse is pressed
      if (mouseIsPressed) {
        var xPos = mouseX - sparkleSize;
        var yPos = mouseY - sparkleSize;
        image(sparkle, xPos, yPos, sparkleSize, sparkleSize);
      }
    };
  
    //adds a slider to control the size of the sparkle drawing on canvas
      this.populateOptions = function() {
        // create a tag under options
        select(".options").html("<div id='sizeOfSparkle'></div>");
  
        var s = select("#sizeOfSparkle");
        s.html("Size of Sparkle: ");
  
        // add sparkle slider
        sparkleSizeSlider = createSlider(5, 50, 20);
        sparkleSizeSlider.parent("#sizeOfSparkle");
  
    };
    
    //when the tool is deselected clear options
      this.unselectTool = function() {
          //clear options
          select("#sizeOfSparkle").html("");
      };
  }
