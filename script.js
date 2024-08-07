document.getElementById("search-button").addEventListener("click", () => {
  const city = document.getElementById("city-input").value;
  getWeather(city);
  getForecast(city);
});

async function getWeather(city) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4fb128c69d4605ffea958e366625fa7b&units=metric`
    );
    const weatherData = response.data;

    document.getElementById("city-name").textContent = weatherData.name;
    document.getElementById(
      "temperature"
    ).textContent = `Temperature: ${weatherData.main.temp} °C`;
    document.getElementById(
      "weather-condition"
    ).textContent = `Condition: ${weatherData.weather[0].description}`;
    document
      .getElementById("weather-condition")
      .appendChild(displayWeatherIcon(weatherData.weather[0]));

    console.log(weatherData);
  } catch (error) {
    console.error("Error fetching weather data", error);
  }
}

async function getForecast(city) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=4fb128c69d4605ffea958e366625fa7b&units=metric`
    );
    console.log(response.data);
    displayForecast(response.data);
  } catch (error) {
    console.error("Error fetching forecast data", error);
  }
}

function displayForecast(data) {
  const forecastContainer = document.querySelector(".forecast");
  forecastContainer.innerHTML = "";

  for (let i = 0; i < data.list.length; i += 8) {
    const dayData = data.list[i];
    const day = document.createElement("div");
    day.classList.add("forecast-day");
    day.innerHTML = `
            <p>${new Date(dayData.dt_txt).toLocaleDateString()}</p>
            <p>Temp: ${dayData.main.temp} °C</p>
        `;
    day.appendChild(displayWeatherIcon(dayData.weather[0]));
    forecastContainer.appendChild(day);
  }
}

function displayWeatherIcon(condition) {
  const icon = document.createElement("img");
  icon.src = `http://openweathermap.org/img/wn/${condition.icon}@2x.png`;
  icon.alt = condition.description;
  return icon;
}
