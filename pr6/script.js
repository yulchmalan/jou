document.addEventListener('DOMContentLoaded', init);

let map, currentLocationMarker, markers = [];
let currentLatitude, currentLongitude;

function init() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    } else {
        alert("Geolocation is not supported by your browser.");
    }

    document.getElementById('goToDestination').addEventListener('click', goToDestination);
}

function displayLocation(position) {
    currentLatitude = position.coords.latitude;
    currentLongitude = position.coords.longitude;

    const div = document.getElementById('location');
    div.innerHTML = `Latitude: ${currentLatitude}, Longitude: ${currentLongitude}`;

    // Initialize map if not already done
    if (!map) {
        map = L.map('map').setView([currentLatitude, currentLongitude], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }

    // Add current location marker
    addMarker(currentLatitude, currentLongitude, `You are here (updated at ${new Date().toLocaleTimeString()})`);

    // Watch position for updates
    navigator.geolocation.watchPosition(updateLocation, displayError);
}

function updateLocation(position) {
    currentLatitude = position.coords.latitude;
    currentLongitude = position.coords.longitude;

    addMarker(currentLatitude, currentLongitude, `Updated location (at ${new Date().toLocaleTimeString()})`);
}

function addMarker(lat, lng, popupText) {
    const marker = L.marker([lat, lng]).addTo(map).bindPopup(popupText).openPopup();
    markers.push(marker);
}

function goToDestination() {
    const input = document.getElementById('destination').value;
    const [destinationLat, destinationLng] = input.split(',').map(coord => parseFloat(coord.trim()));

    if (!isNaN(destinationLat) && !isNaN(destinationLng)) {
        // Fly to destination
        map.flyTo([destinationLat, destinationLng], 13);
        addMarker(destinationLat, destinationLng, 'Destination Point');

        // Calculate distance
        const distance = calculateDistance(currentLatitude, currentLongitude, destinationLat, destinationLng);
        document.getElementById('distance').innerHTML = `Distance to destination: ${distance.toFixed(2)} km`;
    } else {
        alert("Please enter valid coordinates (e.g., 50.4501, 30.5234).");
    }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const R = 6371; // Earth's radius in km

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

function displayError(error) {
    const errorTypes = {
        0: "Unknown error",
        1: "Permission denied",
        2: "Position unavailable",
        3: "Request timeout"
    };
    const errorMessage = errorTypes[error.code] || "An unknown error occurred.";
    document.getElementById('location').innerHTML = `Error: ${errorMessage}`;
}
