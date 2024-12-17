//colourPalette.js
//Displays and handles the colour palette.
function ColourPalette() {
	// A more complete list of colors, now including all colors of the rainbow.
	this.colours = [
		"red",        // Red
		"yellow",     // Yellow
		"green",      // Green
		"blue",       // Blue
		"indigo",     // Indigo
		"violet",     // Violet
		"pink",       // Pink
		"fuchsia",    // Fuchsia
		"purple",     // Purple
		"lime",       // Lime
		"cyan",       // Cyan (another blue-green color)
		"black"      // Black (neutral color)
	];
	
	// Initialize the selected color as black
	this.selectedColour = "black";

	var self = this;

	var colourClick = function() {
		// Remove the old border
		var current = select("#" + self.selectedColour + "Swatch");
		current.style("border", "0");

		// Get the new color from the ID of the clicked element
		var c = this.id().split("Swatch")[0];

		// Set the selected color and update fill and stroke properties
		self.selectedColour = c;
		fill(c);
		stroke(c);

		// Add a new border to the selected color
		this.style("border", "2px solid blue");
	}

	// Load in the colors
	this.loadColours = function() {
		// Set the initial color to black
		fill(this.colours[0]);
		stroke(this.colours[0]);

		// For each color, create a new div in the HTML for the color swatches
		for (var i = 0; i < this.colours.length; i++) {
			var colourID = this.colours[i] + "Swatch";

			// Using p5.dom, add the swatch to the palette and set its background color
			var colourSwatch = createDiv();
			colourSwatch.class('colourSwatches');
			colourSwatch.id(colourID);

			// Add the swatch to the color palette in the HTML
			select(".colourPalette").child(colourSwatch);
			select("#" + colourID).style("background-color", this.colours[i]);
			colourSwatch.mouseClicked(colourClick);
		}

		// Apply the selected swatch border on load
		select(".colourSwatches").style("border", "2px solid blue");
	};

	// Call the loadColours function now it is declared
	this.loadColours();
}
