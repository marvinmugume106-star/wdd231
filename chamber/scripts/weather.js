

const CHAMBER_LATITUDE = 39.7847;
const CHAMBER_LONGITUDE = -104.9444;

function getWeatherDescription(code) {
    const descriptions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Drizzle',
        55: 'Heavy drizzle',
        56: 'Freezing drizzle',
        57: 'Heavy freezing drizzle',
        61: 'Slight rain',
        63: 'Rain',
        65: 'Heavy rain',
        66: 'Freezing rain',
        67: 'Heavy freezing rain',
        71: 'Slight snow',
        73: 'Snow',
        75: 'Heavy snow',
        77: 'Snow grains',
        80: 'Rain showers',
        81: 'Heavy showers',
        82: 'Violent showers',
        85: 'Snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with hail',
        99: 'Severe thunderstorm'
    };

    return descriptions[code] || 'Variable conditions';
}

function getWeatherIcon(code) {
    const iconMap = {
        0: '☀️',
        1: '🌤️',
        2: '⛅',
        3: '☁️',
        45: '🌫️',
        48: '🌫️',
        51: '🌦️',
        53: '🌦️',
        55: '🌧️',
        56: '🌧️',
        57: '🌧️',
        61: '🌧️',
        63: '🌧️',
        65: '🌧️',
        66: '🌧️',
        67: '🌧️',
        71: '❄️',
        73: '❄️',
        75: '❄️',
        77: '❄️',
        80: '🌦️',
        81: '🌧️',
        82: '🌧️',
        85: '🌨️',
        86: '🌨️',
        95: '⛈️',
        96: '⛈️',
        99: '⛈️'
    };

    return iconMap[code] || '🌤️';
}

async function displayWeather() {
    const weatherContainer = document.getElementById('weather-container');

    try {
        const url = new URL('https://api.open-meteo.com/v1/forecast');
        url.search = new URLSearchParams({
            latitude: CHAMBER_LATITUDE,
            longitude: CHAMBER_LONGITUDE,
            current: 'temperature_2m,weather_code',
            daily: 'temperature_2m_max,temperature_2m_min,weather_code',
            timezone: 'auto',
            forecast_days: '3'
        }).toString();

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Weather data not available');
        }

        const data = await response.json();
        const current = data.current;
        const current_temp = Math.round(current.temperature_2m);
        const current_desc = getWeatherDescription(current.weather_code);
        const current_icon = getWeatherIcon(current.weather_code);

        const forecast = data.daily.time.map((dateString, index) => ({
            date: new Date(dateString),
            high: Math.round(data.daily.temperature_2m_max[index]),
            low: Math.round(data.daily.temperature_2m_min[index]),
            desc: getWeatherDescription(data.daily.weather_code[index]),
            icon: getWeatherIcon(data.daily.weather_code[index])
        }));

        let weatherHTML = `
            <div class="current-weather">
                <h3>Current Weather</h3>
                <div class="weather-main">
                    <div class="weather-icon">${current_icon}</div>
                    <div class="weather-details">
                        <div class="temperature">${current_temp}°F</div>
                        <div class="weather-desc">${current_desc}</div>
                    </div>
                </div>
            </div>
            <div class="forecast">
        `;

        forecast.forEach((day) => {
            const dayName = day.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            weatherHTML += `
                <div class="forecast-day">
                    <h4>${dayName}</h4>
                    <div style="font-size: 1.5rem; margin: 0.5rem 0;">${day.icon}</div>
                    <div class="forecast-temp">
                        <span style="color: var(--primary-color);">High:</span> ${day.high}°F
                    </div>
                    <div class="forecast-temp">
                        <span style="color: var(--primary-color);">Low:</span> ${day.low}°F
                    </div>
                    <p>${day.desc}</p>
                </div>
            `;
        });

        weatherHTML += `</div>`;
        weatherContainer.innerHTML = weatherHTML;
    } catch (error) {
        console.error('Error fetching weather:', error);
        weatherContainer.innerHTML = `
            <div class="current-weather">
                <h3>Weather Information Unavailable</h3>
                <p>Unable to load weather data right now. Please try again later.</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', displayWeather);
