// In your JavaScript file
// Removed duplicate generateFountainList definition.

// Loop through each building and add markers
for (const building of buildings) {
    L.marker([building.lat, building.lng])
        .addTo(map)
        .bindPopup(generateFountainList(building));
}

// Function to generate fountain list in popups
function generateFountainList(building) {
    let fountainList = `<h3>${building.name}</h3><h4>Water Fountains:</h4>`;
    
    for (const [, fountain] of building.fountains.entries()) {
        fountainList += `<button class="fountain-button" 
                            data-lat="${building.lat}" 
                            data-lng="${building.lng}" 
                            data-description="${fountain.description}" 
                            data-tags="${fountain.tags.join(',')}">
                            ${fountain.description}
                         </button><br>`;
    }

    return fountainList;
}

// Event listener for popup open
map.on("popupopen", function (e) {
    let popupContent = e.popup._contentNode;
    if (!popupContent) return;

    let buttons = popupContent.querySelectorAll(".fountain-button");

    for (const button of buttons) {
        button.addEventListener("click", function () {
            let lat = Number.parseFloat(this.dataset.lat);
            let lng = Number.parseFloat(this.dataset.lng);
            let description = this.dataset.description;
            let tags = this.dataset.tags.split(",");

            let isFunctional = tags[0] === "TRUE";
            let fountainType = tags[1];

            L.popup()
                .setLatLng([lat, lng])
                .setContent(
                    `<h4>Fountain Info</h4>
                    <p><strong>Location:</strong> ${description}</p>
                    <p><strong>In Bathroom:</strong> ${isFunctional ? "Yes" : "No"}</p>
                    <p><strong>Type:</strong> ${fountainType}</p>`
                )
                .openOn(map);
        });
    }
});


// Adds functionality to all the buttons on the bottom left
document.addEventListener("DOMContentLoaded", function () {
    // The about button is also the clickable image
    const aboutButton = document.getElementById("about-button") || document.querySelector('.about-btn');

    if (aboutButton) {
        aboutButton.addEventListener("click", function () {
            globalThis.location.href = "../about/about.html";
        });
    } else {
        console.error("About button/clickable image not found.");
    }
});





  
