// Initialize Leaflet Map
const map = L.map('map').setView([51.44042, -0.94534], 16);

L.tileLayer('https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=5AwECu4aJ1Ol9omBCKbi', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>'
}).addTo(map);

// Function to generate fountain list in popups
function generateFountainList(building) {
    let fountainList = `<h3>${building.name}</h3><h4>Water Fountains:</h4>`;
    
    for (const fountain of building.fountains) {
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

// Load buildings data and add markers
try {
    const response = await fetch('buildings.json');
    if (!response.ok) {
        throw new Error('Failed to load buildings data');
    }
    const buildings = await response.json();

    // Loop through each building and add markers
    for (const building of buildings) {
        L.marker([building.lat, building.lng])
            .addTo(map)
            .bindPopup(generateFountainList(building))
            .bindTooltip(building.name, {
                permanent: false,
                direction: 'top'
            });
    }
} catch (error) {
    console.error('Error loading buildings:', error);
    alert('Failed to load building data. Please check the console for details.');
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

// About button functionality (no DOMContentLoaded needed with module)
const aboutButton = document.getElementById("about-btn");
if (aboutButton) {
    aboutButton.addEventListener("click", function () {
        window.location.href = "../about/about.html";
    });
} else {
    console.error("About button not found.");
}