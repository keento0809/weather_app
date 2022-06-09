import CURRENT_WEATHER from "../apikeys.js";
import { checkIfFavorite } from "./favorite.js";
import { forecastFiveDaysAndAThreeGap } from "./forecast.js";

const cityName = document.querySelector(".cityName");
const description = document.querySelector(".description");
const temperature = document.querySelector(".temperature");
const weatherIcon = document.querySelector(".weatherIcon");
const selected = document.querySelector("#favorites");

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
  const data = await weather.json();

  checkIfFavorite(val);

  const nameValue = data["name"];
  cityName.innerHTML = nameValue;
  currentCity = nameValue;

  const iconValue = data.weather[0].icon;
  weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconValue}@2x.png">`;

  const temperatureValue = data.main.temp;
  temperature.innerHTML = temperatureValue + " &#8451";

  const descriptionValue = data.weather[0].description;
  description.innerHTML = descriptionValue;
}

function handleChangeCurrentWeather(e) {
  const chosenCity =
    e.target.value === "Favorites" ? "Vancouver" : e.target.value;
  fetchCurrentCity(chosenCity);
  forecastFiveDaysAndAThreeGap(chosenCity, 0);
}

selected.addEventListener("change", handleChangeCurrentWeather);
