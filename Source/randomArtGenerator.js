//randomArtGenerator.js
function RandomArtTool() {
    // Set an icon and a name for the tool
    this.icon = "assets/random.png";
    this.name = "randomArt";
    this.generator = new ArtGeneratorTool();
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

    // Freeform drawing state
    this.isDrawing = false;
    this.startX = null;
    this.startY = null;

    this.draw = function () {
        // Freeform drawing logic
        if (mouseIsPressed) {
            if (!this.isDrawing) {
                this.startX = mouseX;
                this.startY = mouseY;
                this.isDrawing = true;
            }
            stroke(0); // Black color for freeform drawing
            line(this.startX, this.startY, mouseX, mouseY);
            this.startX = mouseX;
            this.startY = mouseY;
        } else {
            this.isDrawing = false;
        }
    };

    this.populateOptions = function () {
        select(".options").html(
            `<div id="artGeneratorOptions">
              <div id='generateBtns'></div>
            </div>`
        );

        // Add generate button
        const generateBtn = createButton("Generate Random Artwork ✨");
        generateBtn.parent("#generateBtns");

        generateBtn.mousePressed(() => {
            let layer_cp = this.colorPalette.get_random_palette();
            let layer_one_style = random(this.art_styles_list);
            let layer_one_shape = random(this.art_shapes_list);
            let layer_one_complexity = Math.floor(random(10, 30));
            let layer_one_size = Math.floor(random(10, 100));
            let layer_two_style = random(this.art_styles_list);
            let layer_two_shape = random(this.art_shapes_list);
            let layer_two_complexity = Math.floor(random(10, 30));
            let layer_two_size = Math.floor(random(10, 100));
            let bg_color = this.get_random_color(layer_cp);

            // Filter out background color from palette
            let filtered_cp = layer_cp.filter((color) => color != bg_color);
            background(bg_color);

            this.generator.generateLayerOne(
                (art_style = layer_one_style),
                (art_shape = layer_one_shape),
                (color_palette = filtered_cp),
                (complexity = layer_one_complexity),
                (magnitude = layer_one_size)
            );

            this.generator.generateLayerOne(
                (art_style = layer_two_style),
                (art_shape = layer_two_shape),
                (color_palette = filtered_cp),
                (complexity = layer_two_complexity),
                (magnitude = layer_two_size)
            );
        });
    };

    this.get_random_color = function (cp) {
        var idx = Math.floor(Math.random() * cp.length);
        return cp[idx];
    };
}
