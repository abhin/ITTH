// script.js
document
  .getElementById("weather-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const city = document.getElementById("city").value;
    const apiKey = "bf1fe97d50ecfa274cfc1d3d9aee83d7"; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);ß
        updateWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        alert("City not found! Please try again.");
      });
  });

function updateWeatherData(data) {
  document.getElementById("weather-data").style.display = "block";

  document.getElementById("city-name").textContent = data.name;
  document.getElementById("temp").textContent = `${data.main.temp}°C`;
  document.getElementById("description").textContent =
    data.weather[0].description;
  document.getElementById("wind").textContent = `${data.wind.speed} m/s`;
  document.getElementById("humidity").textContent = `${data.main.humidity}%`;

  const iconCode = data.weather[0].icon;
  document.getElementById(
    "weather-icon"
  ).src = `http://openweathermap.org/img/wn/${iconCode}.png`;
}
