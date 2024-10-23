const apiKey = 'YOUR_API_KEY';  // Replace with your actual OpenWeatherMap API key
const city = 'Ho Chi Minh City';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Extract necessary data
    const temp = data.main.temp;
    const weather = data.weather[0].description;

    // Display weather data on the webpage
    document.getElementById('weather').innerHTML = `
      <p>Current Temperature: ${temp}°C</p>
      <p>Weather: ${weather}</p>
    `;
  })
  .catch(error => console.error('Error fetching weather data:', error));
