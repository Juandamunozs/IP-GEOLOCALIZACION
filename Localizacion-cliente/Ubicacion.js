// document.getElementById('getLocationButton').addEventListener('click', () => {
//     fetch('https://ipapi.co/json/')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Error en la red');
//             }
//             return response.json();
//         })
//         .then(data => {

//            //console.log(data);

//            const locationInfo = `
//            IP: ${data.ip}<br>
//            ASN: ${data.asn}<br>
//            Ciudad: ${data.city}<br>
//            País: ${data.country_name}<br>
//            Región: ${data.region}<br>
//            Código postal: ${data.postal}<br>
//            Capital: ${data.country_capital}<br>
//            Área del país: ${data.country_area} km²<br>
//            Población: ${data.country_population}<br>
//            Latitud: ${data.latitude}<br>
//            Longitud: ${data.longitude}<br>
//            Zona horaria: ${data.timezone}<br>
//            Organización: ${data.org}<br>
//            Idiomas: ${data.languages}<br>
//            Código de país: ${data.country_code}<br>
//            TLD del país: ${data.country_tld}<br>
//            Moneda: ${data.currency} (${data.currency_name})<br>
//            Código de llamada: ${data.country_calling_code}<br>
//            En la UE: ${data.in_eu}<br>
//            Continent Code: ${data.continent_code}<br>
//            Network: ${data.network}<br>
//            UTC Offset: ${data.utc_offset}<br>
//            Versión: ${data.version}<br>
//        `;

//             document.getElementById('location').innerHTML = locationInfo;
//             document.getElementById('error').textContent = '';
//         })
//         .catch(error => {
//             document.getElementById('error').textContent = `No se pudo obtener la localización: ${error.message}`;
//         });
// });

// VERSION ILIMITADA
document.addEventListener('DOMContentLoaded', () => {
    obtenerLocalizacion();
    setInterval(obtenerLocalizacion, 5000);
});

function obtenerLocalizacion() {
    const tiempo = new Date();
    let hora = String(tiempo.getHours()).padStart(2, '0');
    let minutos = String(tiempo.getMinutes()).padStart(2, '0');
    let segundos = String(tiempo.getSeconds()).padStart(2, '0');

    fetch('https://ipapi.co/json/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red');
            }
            return response.json();
        })
        .then(data => {
            const { latitude, longitude, city, country_name } = data;

            const locationInfo = `
                Horario: ${hora}:${minutos}:${segundos}<br>
                IP: ${data.ip}<br>
                ASN: ${data.asn}<br>
                Ciudad: ${city}<br>
                País: ${country_name}<br>
                Región: ${data.region}<br>
                Código postal: ${data.postal}<br>
                Capital: ${data.country_capital}<br>
                Área del país: ${data.country_area} km²<br>
                Población: ${data.country_population}<br>
                Latitud: ${latitude}<br>
                Longitud: ${longitude}<br>
                Zona horaria: ${data.timezone}<br>
                Organización: ${data.org}<br>
                Idiomas: ${data.languages}<br>
                Código de país: ${data.country_code}<br>
                Código de país ISO3: ${data.country_code_iso3}<br>
                TLD del país: ${data.country_tld}<br>
                Moneda: ${data.currency} (${data.currency_name})<br>
                Código de llamada: ${data.country_calling_code}<br>
                En la UE: ${data.in_eu}<br>
                Continent Code: ${data.continent_code}<br>
                Network: ${data.network}<br>
                Código de región: ${data.region_code}<br>
                UTC Offset: ${data.utc_offset}<br>
                Versión: ${data.version}<br>
            `;

            document.getElementById('location').innerHTML = locationInfo;
            document.getElementById('error').textContent = '';

            // Llamar a la API de Nominatim
            return fetch(`https://nominatim.openstreetmap.org/reverse?lat=${data.latitude}&lon=${data.longitude}&format=json`);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener la ubicación detallada');
            }
            return response.json();
        })
        .then(geocodeData => {
            //const address = geocodeData.address;
            const neighborhood = geocodeData.display_name || 'No disponible';

           // console.log('Datos del barrio: ', geocodeData);

            document.getElementById('location').innerHTML += `<h3>Barrio: ${neighborhood}</h3>`;

            //console.log('la longitud es: ', geocodeData.lon, 'la latitud es: ', geocodeData.lat);

            // Llamar a la API de OpenWeatherMap
            return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geocodeData.lat}&lon=${geocodeData.lon}&appid=b46111016fc6b418a44b86687a13ddb8&units=metric`);

        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener el clima');
            }
            return response.json();
        })
        .then(weatherData => {
            const weatherInfo = `
                <h3>Información del Clima:</h3>
                Temperatura: ${weatherData.main.temp} °C<br>
                Descripción: ${weatherData.weather[0].description}<br>
                Humedad: ${weatherData.main.humidity}%<br>
                Viento: ${weatherData.wind.speed} m/s
            `;

            document.getElementById('location').innerHTML += weatherInfo;
        })
        .catch(error => {
            document.getElementById('error').textContent = `No se pudo obtener la localización: ${error.message}`;
        });
}



// VERSION LIMITADA DE 50 CONSULTAS POR DIA AL MES SON 1500
// document.addEventListener('DOMContentLoaded', () => {
//     obtenerLocalizacion();
//     setInterval(obtenerLocalizacion, 7200000); // 2 horas
// });

// function obtenerLocalizacion() {
//     const tiempo = new Date();
//     let hora = String(tiempo.getHours()).padStart(2, '0');
//     let minutos = String(tiempo.getMinutes()).padStart(2, '0');
//     let segundos = String(tiempo.getSeconds()).padStart(2, '0');

//     fetch('https://ipinfo.io/json?token=b8354180f8f5d9') 
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Error en la red');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log(data);

//             const locationInfo = `
//             Horario: ${hora}:${minutos}:${segundos}<br>
//             IP: ${data.ip}<br>
//             ASN: ${data.asn}<br>
//             Ciudad: ${data.city}<br>
//             País: ${data.country}<br>
//             Región: ${data.region}<br>
//             Código postal: ${data.postal}<br>
//             Latitud: ${data.loc.split(',')[0]}<br>
//             Longitud: ${data.loc.split(',')[1]}<br>
//             Zona horaria: ${data.timezone}<br>
//             Organización: ${data.org}<br>
//             Código de país: ${data.country}<br>
//             `;

//             document.getElementById('location').innerHTML = locationInfo;
//             document.getElementById('error').textContent = '';
//         })
//         .catch(error => {
//             document.getElementById('error').textContent = `No se pudo obtener la localización: ${error.message}`;
//         });
// }
