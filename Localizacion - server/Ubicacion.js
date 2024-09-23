const axios = require('axios');

async function obtenerLocalizacion() {
    try {
        const response = await axios.get('https://ipapi.co/json/');
        console.log(response.data); // Imprime los datos en la consola
    } catch (error) {
        console.error('Error al obtener la localización:', error.message);
    }
}

// Llama a la función
obtenerLocalizacion();


/*
Para usar nodemon, instala el paquete con el siguiente comando:
npm install --save-dev nodemon

Luego, modifica tu package.json para que el script "start" se vea así:
"scripts": {
    "start": "nodemon server.js"
}

Ahora puedes iniciar tu servidor con:
npm start
*/
