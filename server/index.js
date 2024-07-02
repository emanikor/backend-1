// imports
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// API keys
const IPSTACK_API_KEY = '1c40c918764a40c2aabb689a3aca799f';
const OPENWEATHERMAP_API_KEY = '5f494edd70a16ce0c7710bee6d17f0bb';

// app.get('/', (req, res) => {
//     res.send('Welcome to the API server. Use /api/hello?visitor_name=YourName to get a greeting.');
// });

app.get('/api/hello', async (req, res) => {
    const visitor_name = req.query.visitor_name;
    // const client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const client_ip = "129.205.113.174"
    

    try {
        // Get location data
        const locationResponse = await axios.get(`http://api.ipstack.com/${client_ip}?access_key=${IPSTACK_API_KEY}`);
        const locationData = locationResponse.data;
        const city = locationData.city;
        const lat = locationData.latitude;
        const lon = locationData.longitude;

        // // Get weather data
        // const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}`);
        // const weatherData = weatherResponse.data;
        // const temperature = weatherData.main.temp;
        

        res.json({
            client_ip: client_ip,
            location: city,
            greeting: `Hello, ${visitor_name}!, the temperature is 40 degrees Celsius in ${city}`
        });

        console.log(locationData);
    } catch (error) {
        console.error('Error retrieving data:', error.message);
        res.status(500).send('Error retrieving data');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
