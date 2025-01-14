/*
1. plot out shape as a series of vertices
2. edit the shapre using mouse drag
   * if editing mode is on, highlight the location of vertices

*/

function EditableShapesTool(){
	//set an icon and a name for the object
	this.icon = "assets/shape.png";
    this.name = "editShape";
    this.editMode = false
    this.currentShape = []

    //select canvas
    this.c = select("canvas")


	this.draw = function(){
        noFill()
        updatePixels()

		//if the mouse is pressed
		if(this.mousePressOnCanvas(this.c) && mouseIsPressed){
            if(!this.editMode){
                this.currentShape.push({
                    x: mouseX,
                    y: mouseY
                })
            }else{
                for(var i=0;i<this.currentShape.length;i++){
                    if(dist(this.currentShape[i].x, this.currentShape[i].y, mouseX, mouseY)<15){
                        this.currentShape[i].x = mouseX
                        this.currentShape[i].y = mouseY
                    }
                }
            }

        }

        beginShape();

        for(var i=0;i<this.currentShape.length;i++){
            vertex(this.currentShape[i].x, this.currentShape[i].y)

            if(this.editMode){
                fill('red')
                ellipse(this.currentShape[i].x, this.currentShape[i].y, 10)
                noFill()
            }
        }



        endShape();

    };
    
    //adds buttons to enable editing 
	this.populateOptions = function() {
        // create a tag under options
        select(".options").html("<div id='editBtns'></div>");
  
        // add panda slider
        editBtn = createButton('Edit Shape')
        editBtn.parent("#editBtns");

        editBtn.mousePressed(()=>{
            if(this.editMode){
                this.editMode = false
                editBtn.html('Edit Shape')
            }else{
                this.editMode = true
                editBtn.html('Add Vertex')
            }
        })

        finishBtn = createButton('Finish shape')
        finishBtn.parent("#editBtns");

        // add event for finish btn
        finishBtn.mousePressed(()=>{
            this.editMode = false
            this.draw()
            loadPixels()
            this.currentShape = []
        })
  
    };

    //when the tool is deselected clear options
    this.unselectTool = function() {
        //clear options
        select("#editBtns").html("");

        //reset currentshape
        this.currentShape = []
    };

    this.mousePressOnCanvas = function(canvas){
        if(mouseX > canvas.elt.offsetLeft && mouseX < (canvas.elt.offsetLeft + canvas.width) && mouseY > canvas.elt.offsetTop && mouseY < canvas.height){
            return true
        }

        return false
    }
}