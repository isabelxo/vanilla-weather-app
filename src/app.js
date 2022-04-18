function displayTemp(response) {
  console.log(response.data.main.temp);
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let maxTempElement = document.querySelector("#max-temp");
  let minTempElement = document.querySelector("#min-temp");
  let descriptionWeatherElement = document.querySelector(
    "#description-weather"
  );
  let humidityDescriptionElement = document.querySelector("#humidity-weather");
  let windDescriptionElement = document.querySelector("#wind-weather");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
  descriptionWeatherElement.innerHTML = response.data.weather[0].description;
  humidityDescriptionElement.innerHTML = response.data.main.humidity;
  windDescriptionElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "84919b6ce50d5f3343257ed5591f46ea";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Dallas&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemp);
