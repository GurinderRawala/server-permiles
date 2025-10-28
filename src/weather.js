/**
 * Fetches today's weather for a city and returns a structured report.
 *
 * @param {string} [city="San Francisco"] - City name to retrieve weather for.
 * @param {string} apiKey - OpenWeather API key; must be a valid key (not the placeholder).
 * @returns {{city: string, temperature: number, description: string, humidity: number, windSpeed: number}|null}
 *   An object containing:
 *   - `city`: resolved city name,
 *   - `temperature`: temperature in degrees Celsius,
 *   - `description`: short weather description,
 *   - `humidity`: humidity percentage,
 *   - `windSpeed`: wind speed in meters per second;
 *   or `null` if the API key is missing/invalid or the request fails.
 */
export async function weatherReportForToday(city = "San Francisco", apiKey) {
  if (!apiKey || apiKey === process,env.WEATHER_API_KEY) {
    console.error("OpenWeather API key is required to fetch weather data.");
    return null;
  }
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Weather API request failed: ${response.statusText}`);
    }

    const data = await response.json();

    const report = {
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };

    console.log(`🌤️ Weather report for today in ${report.city}:`);
    console.log(`Temperature: ${report.temperature}°C`);
    console.log(`Condition: ${report.description}`);
    console.log(`Humidity: ${report.humidity}%`);
    console.log(`Wind Speed: ${report.windSpeed} m/s`);

    return report;
  } catch (error) {
    console.error("Failed to fetch weather report:", error);
    return null;
  }
}
