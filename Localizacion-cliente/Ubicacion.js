document.addEventListener('DOMContentLoaded', () => {
    obtenerLocalizacion();
    setInterval(obtenerLocalizacion, 6000);
});

//Funcion para obtener la localizacion por GPS
function obtenerLocalizacion() {
    const tiempo = new Date();
    const hora = String(tiempo.getHours()).padStart(2, '0');
    const minutos = String(tiempo.getMinutes()).padStart(2, '0');
    const segundos = String(tiempo.getSeconds()).padStart(2, '0');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        console.log("La geolocalización no está soportada por este navegador.");
        buscarPorIP(hora, minutos, segundos);
    }

    //Funcion para se se pudo obtener la ubicacion por GPS
    function success(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log("Ubicación obtenida por GPS, la latitud es " + lat + ", " + lon);
        buscarDatos(lat, lon, hora, minutos, segundos);
        document.getElementById('ubicacion').textContent = 'Ubicación obtenida por GPS';
    }


    //Funcion para se no se pudo obtener la ubicacion por GPS
    function error() {
        console.log("No se pudo obtener la ubicación GPS, buscando por IP...");
        buscarPorIP(hora, minutos, segundos);
        document.getElementById('ubicacion').textContent = 'Ubicación obtenida por IP';
    }
}

//Funcion para buscar los datos de la ubicacion por GPS
function buscarDatos(lat, lon, hora, minutos, segundos) {
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
        .then(response => {
            if (!response.ok) throw new Error('Error al obtener la ubicación detallada');
            return response.json();
        })
        .then(geocodeData => {
            mostrarInformacion({ latitude: lat, longitude: lon }, hora, minutos, segundos);
            mostrarDireccion(geocodeData);
            return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geocodeData.lat}&lon=${geocodeData.lon}&appid=b46111016fc6b418a44b86687a13ddb8&units=metric`);
        })
        .then(response => {
            if (!response.ok) throw new Error('Error al obtener el clima');
            return response.json();
        })
        .then(weatherData => {
            mostrarClima(weatherData);
        })
        .catch(error => {
            console.log("Error al obtener la ubicación GPS, buscando por IP...");
            buscarPorIP(hora, minutos, segundos);
        });
}

//Funcion para buscar los datos de la ubicacion por IP
function buscarPorIP(hora, minutos, segundos) {
    fetch('https://ipapi.co/json/')
        .then(response => {
            if (!response.ok) throw new Error('Error en la red');
            return response.json();
        })
        .then(data => {
            mostrarInformacion(data, hora, minutos, segundos);
            return fetch(`https://nominatim.openstreetmap.org/reverse?lat=${data.latitude}&lon=${data.longitude}&format=json`);
        })
        .then(response => {
            if (!response.ok) throw new Error('Error al obtener la ubicación detallada');
            return response.json();
        })
        .then(geocodeData => {
            mostrarDireccion(geocodeData);
            return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geocodeData.lat}&lon=${geocodeData.lon}&appid=b46111016fc6b418a44b86687a13ddb8&units=metric`);
        })
        .then(response => {
            if (!response.ok) throw new Error('Error al obtener el clima');
            return response.json();
        })
        .then(weatherData => {
            mostrarClima(weatherData);
        })
        .catch(error => {
            document.getElementById('error').textContent = `No se pudo obtener la localización: ${error.message}`;
        });
}

//Funcion para mostrar la informacion de la ubicacion
function mostrarInformacion(data, hora, minutos, segundos) {
    const locationInfo = `
        Horario: ${hora}:${minutos}:${segundos}<br>
        Latitud: ${data.latitude}<br>
        Longitud: ${data.longitude}<br>
    `;
    document.getElementById('location').innerHTML = locationInfo;
}

//Funcion para mostrar la direccion de la ubicacion
function mostrarDireccion(geocodeData) {
    const address = [
        geocodeData.address.house_number || 'N/A',
        geocodeData.address.road || 'N/A',
        geocodeData.address.city || 'N/A',
        geocodeData.address.state || 'N/A',
        geocodeData.address.country || 'N/A'
    ].join(', ');

    document.getElementById('location').innerHTML += `<h3>Dirección:</h3> ${address}`;
}

//Funcion para mostrar el clima de la ubicacion
function mostrarClima(weatherData) {
    const weatherInfo = `
        <h3>Información del Clima:</h3>
        Temperatura: ${weatherData.main.temp} °C<br>
        Descripción: ${weatherData.weather[0].description}<br>
        Humedad: ${weatherData.main.humidity}%<br>
        Viento: ${weatherData.wind.speed} m/s
    `;
    document.getElementById('location').innerHTML += weatherInfo;
}
