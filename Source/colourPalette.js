class ColourPalette {
    constructor() {
        this.selectedColour = "#000000"; // Default color
        this.selectedSize = 2; // Default pen size
        this.createPalette();
    }

    createPalette() {
        const paletteContainer = document.querySelector(".colourPalette");

        if (!paletteContainer) {
            console.error("Error: .colourPalette container not found!");
            return;
        }
        
        // Prevent creating the palette if it already exists
        if (document.querySelector('.colorPickerContainer')) {
            return; // Exit if the color picker already exists
        }

        // Create a container for the color picker
        const colorPickerContainer = document.createElement("div");
        colorPickerContainer.classList.add("colorPickerContainer");
        paletteContainer.appendChild(colorPickerContainer);

        // Create a label for color picker
        const colorLabel = document.createElement("p");
        colorLabel.textContent = "Select Color:";
        colorPickerContainer.appendChild(colorLabel);

        // Create an input color picker
        this.colorPicker = document.createElement("input");
        this.colorPicker.type = "color";
        this.colorPicker.value = this.selectedColour;
        this.colorPicker.classList.add("colorPicker");
        this.colorPicker.addEventListener("input", () => this.updateColour());
        colorPickerContainer.appendChild(this.colorPicker);

        // Create a container for the pen size slider
        const sizeContainer = document.createElement("div");
        sizeContainer.classList.add("sizeContainer");
        paletteContainer.appendChild(sizeContainer);

        // Create a label for pen size
        this.sizeLabel = document.createElement("p");
        this.sizeLabel.textContent = "Pen Size: " + this.selectedSize;
        sizeContainer.appendChild(this.sizeLabel);

        // Create a slider for pen size selection
        this.sizeSlider = document.createElement("input");
        this.sizeSlider.type = "range";
        this.sizeSlider.min = 1;
        this.sizeSlider.max = 20;
        this.sizeSlider.value = this.selectedSize;
        this.sizeSlider.addEventListener("input", () => this.updatePenSize());
        sizeContainer.appendChild(this.sizeSlider);
    }

    updateColour() {
        this.selectedColour = this.colorPicker.value;
        fill(this.selectedColour);
        stroke(this.selectedColour);
    }

    updatePenSize() {
        this.selectedSize = this.sizeSlider.value;
        this.sizeLabel.textContent = "Pen Size: " + this.selectedSize;
        strokeWeight(this.selectedSize);
    }
}

// Create an instance of ColourPalette
window.addEventListener('DOMContentLoaded', (event) => {
    const colourPalette = new ColourPalette();
});

