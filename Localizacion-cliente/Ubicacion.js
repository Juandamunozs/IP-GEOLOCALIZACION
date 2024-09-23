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

document.addEventListener('DOMContentLoaded', () => {
    obtenerLocalizacion();
    setInterval(obtenerLocalizacion, 5000); 
});

function obtenerLocalizacion() {

    const tiempo = new Date();

    let hora = tiempo.getHours();

    if (hora < 10) {
        hora = '0' + hora;
    }

    let minutos = tiempo.getMinutes();

    if (minutos < 10) {
        minutos = '0' + minutos;
    }

    let segundos = tiempo.getSeconds();

    if (segundos < 10) {
        segundos = '0' + segundos;
    }

    //console.log(`Rastreando en la Hora: ${hora}:${minutos}:${segundos}`);

    fetch('https://ipapi.co/json/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            const locationInfo = `
            Horario: ${hora}:${minutos}:${segundos}<br>
            IP: ${data.ip}<br>
            ASN: ${data.asn}<br>
            Ciudad: ${data.city}<br>
            País: ${data.country_name}<br>
            Región: ${data.region}<br>
            Código postal: ${data.postal}<br>
            Capital: ${data.country_capital}<br>
            Área del país: ${data.country_area} km²<br>
            Población: ${data.country_population}<br>
            Latitud: ${data.latitude}<br>
            Longitud: ${data.longitude}<br>
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
        })
        .catch(error => {
            document.getElementById('error').textContent = `No se pudo obtener la localización: ${error.message}`;
        });
}

