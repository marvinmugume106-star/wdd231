

const WEATHER_API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; 
const CHAMBER_LATITUDE = 40.7128; 
const CHAMBER_LONGITUDE = -74.0060; 


async function displayWeather() {
    const weatherContainer = document.getElementById('weather-container');
    
    try {
    
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${CHAMBER_LATITUDE}&lon=${CHAMBER_LONGITUDE}&units=imperial&appid=${WEATHER_API_KEY}`
        );

        if (!response.ok) {
            throw new Error('Weather data not available');
        }

        const data = await response.json();

        
        const current = data.list[0];
        const current_temp = Math.round(current.main.temp);
        const current_desc = current.weather[0].description;
        const current_icon = getWeatherIcon(current.weather[0].main);

       
        for (let i = 0; i < data.list.length; i += 8) {
            if (forecast.length < 3) {
                const dayData = data.list[i];
                forecast.push({
                    date: new Date(dayData.dt * 1000),
                    high: Math.round(dayData.main.temp_max),
                    low: Math.round(dayData.main.temp_min),
                    desc: dayData.weather[0].description,
                    icon: getWeatherIcon(dayData.weather[0].main)
                });
            }
        }

        
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

        forecast.forEach((day, index) => {
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
                <p>Unable to load weather data. Please check your API key or try again later.</p>
                <p style="font-size: 0.85rem; margin-top: 1rem; opacity: 0.8;">
                    To use weather data, get a free API key from <a href="https://openweathermap.org/api" style="color: inherit; text-decoration: underline;">openweathermap.org</a>
                </p>
            </div>
        `;
    }
}


function getWeatherIcon(condition) {
    const iconMap = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Overcast': '☁️',
        'Drizzle': '🌦️',
        'Rain': '🌧️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Smoke': '💨',
        'Haze': '🌫️',
        'Dust': '🌪️',
        'Fog': '🌫️',
        'Sand': '🌪️',
        'Ash': '🌋',
        'Squall': '💨',
        'Tornado': '🌪️',
        'Partly cloudy': '⛅'
    };
    
    return iconMap[condition] || '🌤️';
}


document.addEventListener('DOMContentLoaded', displayWeather);
