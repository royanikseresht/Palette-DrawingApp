//areGenerator.js
function ArtGeneratorTool() {
  this.icon = "assets/abstract.png";
  this.name = "artGenerator";
  this.colorPalette = new colorPalette();
  this.palette = this.colorPalette.palette;
  this.palette_names = this.colorPalette.palette_names;

  this.art_styles_list = [
    "Chaotic",
    "Striped Horizontal",
    "Striped Vertical",
    "Mosaic",
    "Cornered",
    "Centered",
    "Empty",
  ];

  this.art_shapes_list = [
    "Lines",
    "Hollow Polygons",
    "Rings",
  ];

  //select canvas
  this.c = select("canvas");

  this.startX = this.c.elt.offsetLeft
  this.endX = this.c.elt.offsetLeft + this.c.width
  this.startY = this.c.elt.offsetTop
  this.endY = this.c.elt.offsetTop + this.c.height
  this.width = this.c.width
  this.height = this.c.height

  this.magnitude = [10, 100]

  this.draw = function () {
    
  };

  this.populateOptions = function () {
    // create option tags
    select(".options").html(
      `<div id="artGeneratorOptions">
        <div id="colorOption">
          <div id="colorPaletteOption"></div>
        </div>
        <div id="layer1Options">
          <div id="artStyleOption"></div>
          <div id="artShapeOption"></div>
          <div id="complexityOption"></div>
          <div id="sizeOption"></div>
        </div>
        <div id="layer2Options">
          <div id="artStyleOption2"></div>
          <div id="artShapeOption2"></div>
          <div id="complexityOption2"></div>
          <div id="sizeOption2"></div>
        </div>
        <div id='generateBtns'></div>
      </div>`
    );

    // create color palette selector, create options for selector
    var colorPaletteOption = select("#colorPaletteOption");
    colorPaletteOption.html("Color Palette: ");

    colorSelector = createSelect();
    colorSelector.parent("#colorPaletteOption");

    for (var i = 0; i < this.palette_names.length; i++) {
      colorSelector.option(this.palette_names[i]);
    }

    // random color palette
    let color_index = Math.floor(random(0, this.palette_names.length))
    colorSelector.selected(this.palette_names[color_index])

    // create art style selector, options for selector
    var artStyleOption = select("#artStyleOption");
    artStyleOption.html("Layer 1 Style: ");

    artStyleSelector = createSelect();
    artStyleSelector.parent("#artStyleOption");

    for (var i = 0; i < this.art_styles_list.length; i++) {
      artStyleSelector.option(this.art_styles_list[i]);
    }

    artStyleSelector.selected('Striped Vertical')

    // create art shape selector, create options
    var artShapeOption = select("#artShapeOption");
    artShapeOption.html("Layer 1 Shape: ");

    artShapeSelector = createSelect();
    artShapeSelector.parent("#artShapeOption");

    for (var i = 0; i < this.art_shapes_list.length; i++) {
      artShapeSelector.option(this.art_shapes_list[i]);
    }

    // add complexity slider
    var complexityOption = select("#complexityOption");
    complexityOption.html("Layer 1 Complexity: ");
    complexitySlider = createSlider(10, 30, 10);
    complexitySlider.parent("#complexityOption");

    // add shape size slider
    var sizeOption = select("#sizeOption");
    sizeOption.html("Layer 1 Size: ");
    sizeSlider = createSlider(10, 100, 50);
    sizeSlider.parent("#sizeOption");

    // create art style selector, options for selector
    var artStyleOption2 = select("#artStyleOption2");
    artStyleOption2.html("Layer 2 Style: ");

    artStyleSelector2 = createSelect();
    artStyleSelector2.parent("#artStyleOption2");

    for (var i = 0; i < this.art_styles_list.length; i++) {
      artStyleSelector2.option(this.art_styles_list[i]);
    }

    artStyleSelector2.selected('Cornered')

    // create art shape selector, create options
    var artShapeOption2 = select("#artShapeOption2");
    artShapeOption2.html("Layer 2 Shape: ");

    artShapeSelector2 = createSelect();
    artShapeSelector2.parent("#artShapeOption2");

    for (var i = 0; i < this.art_shapes_list.length; i++) {
      artShapeSelector2.option(this.art_shapes_list[i]);
    }

    artShapeSelector2.selected('Rings')

    // add complexity slider
    var complexityOption2 = select("#complexityOption2");
    complexityOption2.html("Layer 2 Complexity: ");
    complexitySlider2 = createSlider(10, 30, 10);
    complexitySlider2.parent("#complexityOption2");

    // add shape size slider
    var sizeOption2 = select("#sizeOption2");
    sizeOption2.html("Layer 2 Size: ");
    sizeSlider2 = createSlider(10, 100, 50);
    sizeSlider2.parent("#sizeOption2");

    // add generate btn
    generateBtn = createButton("Generate ✨");
    generateBtn.parent("#generateBtns");

    generateBtn.mousePressed(()=>{
      let layer_color = colorSelector.value()
      let layer_cp = this.colorPalette.get_color_from_name(layer_color)
      let layer_one_style = artStyleSelector.value()
      let layer_one_shape = artShapeSelector.value()
      let layer_one_complexity = complexitySlider.value()
      let layer_one_size = sizeSlider.value()
      let layer_two_style = artStyleSelector2.value()
      let layer_two_shape = artShapeSelector2.value()
      let layer_two_complexity = complexitySlider2.value()
      let layer_two_size = sizeSlider2.value()
      let bg_color = this.get_random_color(layer_cp)
      // filter out background color from palette
      let filtered_cp = layer_cp.filter(color=>color!=bg_color)
      background(bg_color)
      this.generateLayerOne(art_style=layer_one_style, art_shape=layer_one_shape, color_palette=filtered_cp, complexity=layer_one_complexity, magnitude=layer_one_size)
      this.generateLayerOne(art_style=layer_two_style, art_shape=layer_two_shape, color_palette=filtered_cp, complexity=layer_two_complexity, magnitude=layer_two_size)
  })
    
  };

  //when the tool is deselected clear options
  this.unselectTool = function () {
    //clear options
    select("#artGeneratorOptions").html("");
    noFill()
    noStroke()
  };

  this.generateLayerOne = function(art_style, art_shape, color_palette, complexity, magnitude){
    this.generateArt(art_style, art_shape, color_palette, complexity, magnitude)
  };

  this.generateArt = function(art_style, art_shape, color_palette, complexity, magnitude){
    if(this.art_shapes_list[0] == art_shape){
      this.generate_lines(complexity, color_palette, art_style, magnitude)
    }else if(this.art_shapes_list[1] == art_shape){
      this.generate_polygons(complexity, color_palette, art_style, magnitude, 1)
    }else if(this.art_shapes_list[4] == art_shape){
      this.generate_polygons(complexity, color_palette, art_style, magnitude, 0)
    }else if(this.art_shapes_list[5] == art_shape){
    }
  };

  this.generate_lines = function(complexity, cp, style, magnitude){

    if(style==this.art_styles_list[0]){    // chaotic

      for(let i=0; i<complexity; i++){
        let posX0 = random(this.startX-200, this.endX+200)
        let posX1 = random(this.startX, this.endX)
        let posY0 = random(this.startY-200, this.endY+200)
        let posY1 = random(this.startY, this.endY)
        let current_color = this.get_random_color(cp)
        stroke(current_color)
        let size = random(5, magnitude)
        strokeWeight(size)
        line(posX0, posY0, posX1, posY1)
      }
    }else if(style==this.art_styles_list[1]){   // striped horizontal
      let size = random(5, magnitude)
      strokeWeight(size)
      let interval = Math.floor(this.height/complexity)
      for(let i=0; i<complexity; i++){
        let posX0 = 0
        let posX1 = this.endX
        let posY0 = i*interval + random(0, this.height/10)
        let posY1 = i*interval + random(0, this.height/10)
        let current_color = this.get_random_color(cp)
        stroke(current_color)
        line(posX0, posY0, posX1, posY1)
      }
    }else if(style==this.art_styles_list[2]){  // striped vertical

      let interval = Math.floor(this.width/complexity)
      for(let i=0; i<complexity; i++){
        let posY0 = 0
        let posY1 = this.endY
        let posX0 = i*interval + random(0, this.width/10)
        let posX1 = i*interval + random(0, this.width/10)
        let current_color = this.get_random_color(cp)
        stroke(current_color)
        let size = random(5, magnitude)
        strokeWeight(size)
        line(posX0, posY0, posX1, posY1)
      }    
    }else if(style==this.art_styles_list[3]){   // mosaic

      let row_line_count = Math.floor(complexity/3)+1
      let row_count = Math.floor(complexity/4)+1
      let x_interval = this.width/(row_line_count-1)
      let y_interval = this.height/(row_count-1)
      let color_one = this.get_random_color(cp)
      let color_two = this.get_random_color(cp)
      while(color_one==color_two){
        color_two = this.get_random_color(cp)
      }
      let current_color
      for(let i=0;i<row_count;i++){
        for(let j=0;j<row_line_count;j++){
          if((i+j)%2==0){
            current_color = color_one
          }else{
            current_color = color_two
          }
          let posX = [x_interval*j, x_interval*(j+1)]
          let posY_u = [y_interval*i, y_interval*(i+1)]
          let posY_d = [y_interval*(i+1), y_interval*(i)]
          stroke(current_color)
          let size = random(5, magnitude)
          strokeWeight(size)
          if(Math.round(random(0,1)==0)){            
            line(posX[0], posY_u[0], posX[1], posY_u[1])
          }else{
            line(posX[0], posY_d[0], posX[1], posY_d[1])
          }

        }
      }
    }else if(style==this.art_styles_list[4]){ // cornered

      for(let i=0;i<complexity*2;i++){
        let current_color = this.get_random_color(cp)
        let corner = Math.floor(random(0,4))
        let first_x_area = 0
        let second_x_area = 0
        let first_y_area = 0
        let second_y_area = 0
        if(corner==0){
          first_x_area = [-50, 100]
          second_x_area = [0, this.width/2]
          first_y_area = [-50, 100]
          second_y_area = [this.height/2]
        }else if(corner==1){
          first_x_area = [this.width-100, this.width+50]
          second_x_area = [this.width/2, this.width]
          first_y_area = [-50, 100]
          second_y_area = [0, this.height/2]
        }else if(corner==2){
          first_x_area = [this.width-100, this.width+50]
          second_x_area = [this.width/2, this.width]
          first_y_area = [this.height-100, this.height+50]
          second_y_area = [this.height/2, this.height]
        }else if(corner==3){
          first_x_area = [-50, 100]
          second_x_area = [0, this.width/2]
          first_y_area = [this.height-100, this.height+50]
          second_y_area = [this.height/2, this.height]
        }

        let posX = [random(first_x_area[0], first_x_area[1]), random(second_x_area[0], second_x_area[1])]
        let posY = [random(first_y_area[0], first_y_area[1]), random(second_y_area[0], second_y_area[1])]

        stroke(current_color)
        let size = random(5, magnitude)
        strokeWeight(size)
        line(posX[0], posY[0], posX[1], posY[1])
      }
    }else if(style==this.art_styles_list[5]){   //centered

      for(let i=0;i<complexity/2;i++){
        let current_color = this.get_random_color(cp)
        posX = [random(2*this.width/5, 3*this.width/5), random(0, this.width)]
        posY = [random(2*this.height/5, 3*this.height/5), random(0, this.height)]
        let size = random(5, magnitude)
        strokeWeight(size)
        stroke(current_color)
        line(posX[0], posY[0], posX[1], posY[1])
      }
    }
  };

  this.get_random_color = function(cp){
    var idx = Math.floor(Math.random() * cp.length); 
    return cp[idx]
  }

  this.generate_polygons = function(complexity, cp, style, magnitude, fill_shape){
    if(style==this.art_styles_list[0]){     //chaotic
      for(let i=0; i<complexity/2; i++){
        let current_color = this.get_random_color(cp)

        if(fill_shape==1){
          rad = random(magnitude/5, this.magnitude[0]/5)
          strokeWeight(rad)
          noFill()
          stroke(current_color)
        }else{
          strokeWeight(0)
          fill(current_color)
        }

        let point_lst = []

        let x1 = random(0, this.width)
        let y1 = random(0, this.height)

        for(let j=0;j<4;j++){
          posX = random(x1-this.magnitude[1]*2, x1+this.magnitude[1]*2)
          posY = random(y1-this.magnitude[1]*2, y1+this.magnitude[1]*2)
          point_lst.push(posX)
          point_lst.push(posY)
        }

        //array unpacking
        let x2,y2,x3,y3,x4,y4
        [x1,y1,x2,y2,x3,y3,x4,y4] = point_lst

        quad(x1,y1,x2,y2,x3,y3,x4,y4)

      }
    }else if(style==this.art_styles_list[1]){   // Striped Horizontal
      let row_circle_count = Math.floor(complexity/2)
      let row_count = Math.floor(complexity/3)
      let x_interval = this.width/row_circle_count
      let y_interval = this.height/row_count

      let color_one = this.get_random_color(cp)
      let color_two = this.get_random_color(cp)
      while(color_one==color_two){
        color_two = this.get_random_color(cp)
      }
      let current_color = color_one

      for(let i=0;i<row_count;i++){

        if((i+1)%2==0){
          current_color = color_one
        }else{
          current_color = color_two
        }

        for(let j=0;j<row_circle_count;j++){
          if(fill_shape==1){
            rad = random(magnitude/10, this.magnitude[0]/10)
            strokeWeight(rad)
            noFill()
            stroke(current_color)
          }else{
            strokeWeight(0)
            fill(current_color)
          }

          let x_area = [x_interval * j, x_interval * (j + 1)]
          let y_area = [y_interval * i, y_interval * (i + 1)]

          let point_lst = []
          
          if((i+1)%2==0){      
            for(let k=0;k<4;k++){
              point_lst.push(random(x_area[0],x_area[1]))
              point_lst.push(random(y_area[0],y_area[1]))
            }      

            //array unpacking
            let x1,y1,x2,y2,x3,y3,x4,y4
            [x1,y1,x2,y2,x3,y3,x4,y4] = point_lst

            quad(x1,y1,x2,y2,x3,y3,x4,y4)

          }

        }
      }
    }else if(style==this.art_styles_list[2]){   // striped vertical
      let row_circle_count = Math.floor(complexity/2)
      let row_count = Math.floor(complexity/3)
      let x_interval = this.width/row_circle_count
      let y_interval = this.height/row_count

      let color_one = this.get_random_color(cp)
      let color_two = this.get_random_color(cp)
      while(color_one==color_two){
        color_two = this.get_random_color(cp)
      }
      let current_color = color_one

      for(let i=0;i<row_count;i++){

        for(let j=0;j<row_circle_count;j++){
          if(j%2==0){
            current_color = color_one
          }else{
            current_color = color_two
          }

          if(fill_shape==1){
            rad = random(magnitude/10, this.magnitude[0]/10)
            strokeWeight(rad)
            noFill()
            stroke(current_color)
          }else{
            strokeWeight(0)
            fill(current_color)
          }

          let x_area = [x_interval * j, x_interval * (j + 1)]
          let y_area = [y_interval * i, y_interval * (i + 1)]

          let point_lst = []
          
          if(j%2==0){      
            for(let k=0;k<4;k++){
              point_lst.push(random(x_area[0],x_area[1]))
              point_lst.push(random(y_area[0],y_area[1]))
            }      

            //array unpacking
            let x1,y1,x2,y2,x3,y3,x4,y4
            [x1,y1,x2,y2,x3,y3,x4,y4] = point_lst

            quad(x1,y1,x2,y2,x3,y3,x4,y4)

          }

        }
      }
    }else if(style==this.art_styles_list[3]){   //mosaic
      let row_circle_count = Math.floor(complexity/2)
      let row_count = Math.floor(complexity/3)
      let x_interval = this.width/row_circle_count
      let y_interval = this.height/row_count

      let color_one = this.get_random_color(cp)
      let color_two = this.get_random_color(cp)
      while(color_one==color_two){
        color_two = this.get_random_color(cp)
      }
      let current_color = color_one

      for(let i=0;i<row_count;i++){

        for(let j=0;j<row_circle_count;j++){
          if((i+j)%2==0){
            current_color = color_one
          }else{
            current_color = color_two
          }

          if(fill_shape==1){
            rad = random(magnitude/10, this.magnitude[0]/10)
            strokeWeight(rad)
            noFill()
            stroke(current_color)
          }else{
            strokeWeight(0)
            fill(current_color)
          }

          let x_area = [x_interval * j, x_interval * (j + 1)]
          let y_area = [y_interval * i, y_interval * (i + 1)]

          let point_lst = []
          
    
            for(let k=0;k<4;k++){
              point_lst.push(random(x_area[0],x_area[1]))
              point_lst.push(random(y_area[0],y_area[1]))
            }      

            //array unpacking
            let x1,y1,x2,y2,x3,y3,x4,y4
            [x1,y1,x2,y2,x3,y3,x4,y4] = point_lst

            quad(x1,y1,x2,y2,x3,y3,x4,y4)

          

        }
      }
    }else if(style==this.art_styles_list[4]){ //cornered

      let x_area = [[-100, this.width/3], [2*this.width/3, this.width+100], [2*this.width/3, this.width+100], [-100, this.width/3]]
      let y_area = [[-100, this.height/2-50], [-100, this.height/2-100],
        [this.height/2+100, this.height+100], [this.height/2+100, this.height+100]]

      for(let i=0;i<(complexity/2);i++){

        let current_color = this.get_random_color(cp)
        let corner = Math.floor(random(0,4))

        if(fill_shape==1){
          rad = random(magnitude/10, this.magnitude[0]/10)
          strokeWeight(rad)
          noFill()
          stroke(current_color)
        }else{
          strokeWeight(0)
          fill(current_color)
        }

        let point_lst = []

        for(let j=0;j<4;j++){

          point_lst.push(random(x_area[corner][0],x_area[corner][1]))
          point_lst.push(random(y_area[corner][0],y_area[corner][1]))      

        }

        //array unpacking
        let x1,y1,x2,y2,x3,y3,x4,y4
        [x1,y1,x2,y2,x3,y3,x4,y4] = point_lst

        quad(x1,y1,x2,y2,x3,y3,x4,y4)
      }

    }else if(style==this.art_styles_list[5]){ 
      let x_inner_area = [this.width/4, 3*this.width/4]
      let x_outer_area = [this.width/6, 5*this.width/6]
      let y_area = [this.height/4, 3*this.height/4]

      for(let i=0;i<(complexity/4);i++){

        let current_color = this.get_random_color(cp)

        if(fill_shape==1){
          rad = random(magnitude/10, this.magnitude[0]/10)
          strokeWeight(rad)
          noFill()
          stroke(current_color)
        }else{
          strokeWeight(0)
          fill(current_color)
        }

        let point_lst = []

        for(let j=0;j<4;j++){
          if(random(0,7)<=4){
            point_lst.push(random(x_inner_area[0],x_inner_area[1]))
            point_lst.push(random(y_area[0],y_area[1]))  
          }else{
            point_lst.push(random(x_outer_area[0],x_outer_area[1]))
            point_lst.push(random(y_area[0],y_area[1]))           
          }
        }

        //array unpacking
        let x1,y1,x2,y2,x3,y3,x4,y4
        [x1,y1,x2,y2,x3,y3,x4,y4] = point_lst

        quad(x1,y1,x2,y2,x3,y3,x4,y4)
      }
    }
  };



}
