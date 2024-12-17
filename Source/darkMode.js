//darkMode.js
document.addEventListener("DOMContentLoaded", function () {
    const darkModeButton = document.getElementById("darkModeButton");
    
    // Ensure the button exists before adding the event listener
    if (darkModeButton) {
        darkModeButton.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });
    } else {
        console.error("Dark Mode button not found.");
    }
});
