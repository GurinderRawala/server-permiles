export async function weatherReportForToday(city = "San Francisco", apiKey) {
  if (!apiKey || apiKey === "<YOUR_API_KEY>") {
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
