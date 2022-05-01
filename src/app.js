function getDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 12) {
    document.querySelector("#greeting").innerHTML = `Good Morning`;
  } else {
    document.querySelector("#greeting").innerHTML = `Good Afternoon`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class= "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
    <div class="weather-forecast-date"> ${formatDay(forecastDay.dt)}</div>
    <img
    src="https://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png"
    alt=""
    width="42"
    />
    <div class="weather-forecast-temperatures">
    <span class="weather-forecast-max" style="display: inline"> 
    ${Math.round(forecastDay.temp.max)}° </span>
    <span class="weather-forecast-min"> 
    ${Math.round(forecastDay.temp.min)}° </span>
  </div>
</div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "84919b6ce50d5f3343257ed5591f46ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let maxTempElement = document.querySelector("#max-temp");
  let minTempElement = document.querySelector("#min-temp");
  let descriptionWeatherElement = document.querySelector(
    "#description-weather"
  );
  let humidityDescriptionElement = document.querySelector("#humidity-weather");
  let windDescriptionElement = document.querySelector("#wind-weather");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  fahrenheitTepmperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(fahrenheitTepmperature);
  cityElement.innerHTML = response.data.name;
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
  descriptionWeatherElement.innerHTML = response.data.weather[0].description;
  humidityDescriptionElement.innerHTML = response.data.main.humidity;
  windDescriptionElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = getDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "84919b6ce50d5f3343257ed5591f46ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Denver");
