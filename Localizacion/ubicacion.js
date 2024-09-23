document.getElementById('getLocationButton').addEventListener('click', () => {
    fetch('https://ipapi.co/json/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red');
            }
            return response.json();
        })
        .then(data => {
            const locationInfo = `
                IP: ${data.ip}<br>
                Ciudad: ${data.city}<br>
                País: ${data.country_name}<br>
                Región: ${data.region}<br>
                Código postal: ${data.postal}<br>
            `;
            document.getElementById('location').innerHTML = locationInfo;
            document.getElementById('error').textContent = '';
        })
        .catch(error => {
            document.getElementById('error').textContent = `No se pudo obtener la localización: ${error.message}`;
        });
});
