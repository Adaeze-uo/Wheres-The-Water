// In your JavaScript file
function generateFountainList(building) {
    let fountainList = `<h3>${building.name}</h3><h4>Water Fountains:</h4><div id="fountain-list">`;
    
    building.fountains.forEach((fountain, index) => {
        fountainList += `<button class="fountain-button" data-index="${index}" data-building="${building.name}">
                            ${fountain.description}
                         </button><br>`;
    });

    fountainList += '</div>';
    return fountainList;
}

// Loop through each building and add markers
buildings.forEach(function (building) {
    let marker = L.marker([building.lat, building.lng])
        .addTo(map)
        .bindPopup(generateFountainList(building));
});

// Function to generate fountain list in popups
function generateFountainList(building) {
    let fountainList = `<h3>${building.name}</h3><h4>Water Fountains:</h4>`;
    
    building.fountains.forEach((fountain, index) => {
        fountainList += `<button class="fountain-button" 
                            data-lat="${building.lat}" 
                            data-lng="${building.lng}" 
                            data-description="${fountain.description}" 
                            data-tags="${fountain.tags.join(',')}">
                            ${fountain.description}
                         </button><br>`;
    });

    return fountainList;
}

// Event listener for popup open
map.on("popupopen", function (e) {
    let popupContent = e.popup._contentNode;
    if (!popupContent) return;

    let buttons = popupContent.querySelectorAll(".fountain-button");

    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            let lat = parseFloat(this.getAttribute("data-lat"));
            let lng = parseFloat(this.getAttribute("data-lng"));
            let description = this.getAttribute("data-description");
            let tags = this.getAttribute("data-tags").split(",");

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
    });
});


// Adds functionality to all the buttons on the bottom left
document.addEventListener("DOMContentLoaded", function () {
    let aboutButton = document.getElementById("about-button");
    let contributeButton = document.getElementById("contribute-button");
    let reportButton = document.getElementById("report-button");

    if (aboutButton) {
        aboutButton.addEventListener("click", function () {
            window.location.href = "about.html";
        });
    } else {
        console.error("About button not found.");
    }

    if (contributeButton) {
        contributeButton.addEventListener("click", function () {
            window.location.href = "contribute.html";
        });
    } else {
        console.error("Contribute button not found.");
    }

    if (reportButton) {
        reportButton.addEventListener("click", function () {
            window.location.href = "report.html";
        });
    } else {
        console.error("Report button not found.");
    }
});





  
