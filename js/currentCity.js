import CURRENT_WEATHER from "../apikeys.js";
import { checkIfFavorite } from "./index.js";
import { forecastFiveDaysAndAThreeGap } from "./forecast.js";
import { handleTesting } from "./checkKeyCode.js";

const cityName = document.querySelector(".cityName");
const description = document.querySelector(".description");
const temperature = document.querySelector(".temperature");
const selected = document.querySelector("#favorites");
const searchInput = document.getElementById("pac-input");
const icon = document.querySelector(".img-icon")

let currentCity = "";
let favoriteCities = [];

export async function fetchCurrentCity(val) {
  if (val == "") {
    alert("Please insert a City name!");
    return;
  }

  const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=${CURRENT_WEATHER}&units=metric`
  );

  // test geolocation
  let currentLocation;
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        currentLocation = pos;
      },
      () => {
      }
    );
  }

  // test
  const locationForWeather = await weather.json();
  const latlon = {
    lat: locationForWeather.coord.lat,
    lon: locationForWeather.coord.lon,
  };
  const weatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${
      currentLocation ? currentLocation.lat : latlon.lat
    }&lon=${
      currentLocation ? currentLocation.lng : latlon.lon
    }&appid=${CURRENT_WEATHER}&units=metric`
  );

  const data = await weatherData.json();

  checkIfFavorite(val);

  const nameValue = data["name"];
  cityName.innerHTML = nameValue;
  currentCity = nameValue;

  const iconValue = data.weather[0].icon;
  icon.src = `http://openweathermap.org/img/wn/${iconValue}@2x.png`;

  const temperatureValue = data.main.temp;
  temperature.innerHTML = temperatureValue + " &#8451";

  const descriptionValue = data.weather[0].description;
  description.innerHTML = descriptionValue;
}

function handleChangeCurrentWeather(e) {
  const chosenCity =
    e.target.value === "Favorites" ? "Vancouver" : e.target.value;
  fetchCurrentCity(chosenCity);
  forecastFiveDaysAndAThreeGap(chosenCity, "");
}

selected.addEventListener("change", handleChangeCurrentWeather);
window.addEventListener("keyup", handleTesting);
