const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// API keys
const IPINFO_ACCESS_TOKEN = '12e14c14-da33-4c47-aa65-fc0699670676';
const WEATHER_API_KEY = 'fa566a26483a061a7b67eb9727cbce9e';

// Helper function to get location data
async function getLocationData(ip) {
    try {
        const response = await axios.get(`https://ipinfo.io/${ip}?token=${IPINFO_ACCESS_TOKEN}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching location data: ${error.message}`);
        return { city: 'Nairobi' };
    }
}

// Helper function to get weather data
async function getWeatherData(city) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`);
        return response.data.main.temp;
    } catch (error) {
        console.error(`Error fetching weather data: ${error.message}`);
        return 'unknown';
    }
}

app.get('/api/hello', async (req, res) => {
    const visitor_name = req.query.visitor_name || 'Guest';
    let client_ip = '41.80.112.212';

    const locationData = await getLocationData(client_ip);
    const city = locationData.city || 'Nairobi';
    const temperature = await getWeatherData(city);

    const greeting = `Hello, ${visitor_name}!, the temperature is ${temperature} degrees Celsius in ${city}`;

    const response = {
        client_ip: client_ip,
        location: city,
        greeting: greeting
    };

    res.json(response);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
