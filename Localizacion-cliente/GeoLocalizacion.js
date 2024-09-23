if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
} else {
    console.log("La geolocalización no está soportada por este navegador.");
}

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(`Latitud: ${lat}, Longitud: ${lon}`);
}

function error() {
    console.log("No se pudo obtener la ubicación.");
}