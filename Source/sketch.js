//sketch.js
//global variables that will store the toolbox colour palette
//amnd the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;

function setup() {
    canvasContainer = select('#content');
    var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
    c.parent("content");

    helpers = new HelperFunctions();
    colourP = new ColourPalette();

    toolbox = new Toolbox();

    // Add tools to the toolbox
    toolbox.addTool(new FreehandTool());
    toolbox.addTool(new EraserTool());
    toolbox.addTool(new DottedBrushTool());
    toolbox.addTool(new StarBrushTool());
    toolbox.addTool(new EllipseTool());
    toolbox.addTool(new RectangleTool());
    toolbox.addTool(new LineToTool());
    toolbox.addTool(new SprayCan());
    toolbox.addTool(new mirrorDrawTool());
    toolbox.addTool(new TextTool());
    toolbox.addTool(new HeartTool());
    toolbox.addTool(new CircleDrawingGameTool());
    toolbox.addTool(new EditableShapesTool());
    toolbox.addTool(new ShapeMemoryGameTool());
    toolbox.addTool(new ImageTool());
    toolbox.addTool(new ArtGeneratorTool());
    toolbox.addTool(new RandomArtTool());
    toolbox.addTool(new ScissorsTool());
    
    // Debug: Log all tools
    console.log("Tools added to toolbox:", toolbox.tools.map((tool) => tool.name));

    // Default background
    background(255);
}

function draw() {
    if (toolbox.selectedTool) {
        console.log(`Currently selected tool: ${toolbox.selectedTool.name}`);
    } else {
        console.log("No tool selected.");
    }

    if (toolbox.selectedTool && typeof toolbox.selectedTool.draw === "function") {
        toolbox.selectedTool.draw();
    } else {
        background(255);
        fill(0);
        textSize(16);
        textAlign(CENTER, CENTER);
        text("Please select a valid tool.", width / 2, height / 2);
    }
}

function mousePressed() {
    if (toolbox.selectedTool && typeof toolbox.selectedTool.mousePressed === "function") {
        toolbox.selectedTool.mousePressed();
    }
}

function mouseReleased() {
    if (toolbox.selectedTool && typeof toolbox.selectedTool.mouseReleased === "function") {
        toolbox.selectedTool.mouseReleased();
    }
}
