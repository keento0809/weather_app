// // Get DOM
import CURRENT_WEATHER from "./apikeys.js";
// const  = config.apiKeyForForecastNextFiveDays;

const submitBtn = document.querySelector(".submitValue");
const inputValue = document.getElementById("pac-input");
const cityName = document.querySelector(".cityName");
const description = document.querySelector(".description");
const temperature = document.querySelector(".temperature");
const weatherIcon = document.querySelector(".weatherIcon");

const selected = document.querySelector("#favorites");

let currentCity = "";
let favoriteCities = [];

async function fetchCurrentCity(val) {
  if (val == "") {
    alert("Please insert a City name!");
    return;
  }
  const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=${CURRENT_WEATHER}&units=metric`
  );
  const data = await weather.json();

  document.getElementById("starIcon").style.display = "block";

  const nameValue = data["name"];
  cityName.innerHTML = nameValue;
  currentCity = nameValue;

  const iconValue = data.weather[0].icon;
  weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconValue}@2x.png">`;

  const temperatureValue = data.main.temp;
  temperature.innerHTML = temperatureValue;

  const descriptionValue = data.weather[0].description;
  description.innerHTML = descriptionValue;
}

submitBtn.addEventListener("click", async function () {
  fetchCurrentCity(inputValue.value);

  const locationData = inputValue.value;
  forecastNextFiveDays(locationData);
});

// // test
async function forecastNextFiveDays(locationData) {
  const location = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${
      locationData ? locationData : "Vancouver"
    }&appid=${CURRENT_WEATHER}`
  );
  const locationForWeather = await location.json();
  const latlon = {
    lat: locationForWeather.coord.lat,
    lon: locationForWeather.coord.lon,
  };
  const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latlon.lat}&lon=${latlon.lon}&appid=${CURRENT_WEATHER}&units=metric`
  );
  const data = await weather.json();

  const dataForNextFiveDays = [];
  const dataForThreeHourGap = [];

  for (let i = 0; i < data.list.length; i += 8) {
    dataForNextFiveDays.push(data.list[i]);
  }

  for (let i = 0; i < 8; i++) {
    dataForThreeHourGap.push(data.list[i]);
  }

  const fiveDaysContent = dataForNextFiveDays
    .map((day, index) => {
      return `
        <div class="wheather" key=${index}>
            <img src="http://openweathermap.org/img/wn/${
              day.weather[0].icon
            }@2x.png" />
            <p> ${day.dt_txt.split(" ")[0].replace(/-/g, "/").slice(5)}</p>
            <p>${day.weather[0].description}</p>
            <p>${parseInt(day.main.temp).toFixed(1)} ℃</p>
            <span>${parseInt(day.main.temp_max).toFixed(
              1
            )} ℃</span> / <span>${parseInt(day.main.temp_min).toFixed(
        1
      )} ℃</span>
     
        </div>
      `;
    })
    .join("");
  fiveDays.innerHTML = fiveDaysContent;

  const threeHourGapContent = dataForThreeHourGap
    .map((data, index) => {
      return `
        <div key=${index} style="padding:1rem;">
        <img src="http://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png" />
        <p>Time: ${data.dt_txt.split(" ")[1].slice(0, 5)}</p>
        <p>Temp: ${parseInt(data.main.temp).toFixed(1)} ℃</p>
        High: <span>${parseInt(data.main.temp_max).toFixed(
          1
        )} ℃</span> / Low: <span>${parseInt(data.main.temp_min).toFixed(
        1
      )} ℃</span>
        <div>
            <span>Humid: ${parseInt(data.main.humidity).toFixed(1)} %</span>
        </div>
        </div>
      `;
    })
    .join("");
  threeHour.innerHTML = threeHourGapContent;
}
forecastNextFiveDays();

function createOptions(dataArr) {
  for (let i = 0; i < dataArr.length; i++) {
    const optionTag = document.createElement("option");
    optionTag.innerHTML = `
    <option value=${dataArr[i]}>
      ${dataArr[i]}
    </option>
  `;
    selected.append(optionTag);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  cityName.textContent = "Vancouver";
  currentCity = "Vancouver";
  document.getElementById("starIcon").style.display = "block";
  fetchCurrentCity(currentCity)

  // check if data exists in localStorage or not
  const citiesFromLocalStorage = localStorage.getItem("favoriteCities");
  favoriteCities = citiesFromLocalStorage
    ? JSON.parse(citiesFromLocalStorage)
    : [];

  // setData to selectTag
  const initialOption = document.createElement("option");
  initialOption.innerHTML = `<option value="">Favorites</option>`;
  selected.append(initialOption);

  if (favoriteCities.length > 0) {
    createOptions(favoriteCities);
  }
});

function handleAddFavorite() {
  const citiesFromLocalStorage = JSON.parse(
    localStorage.getItem("favoriteCities")
  );
  if (citiesFromLocalStorage) {
    let count = 0;
    while (count < citiesFromLocalStorage.length) {
      if (citiesFromLocalStorage[count] === currentCity) {
        alert("You've already added this city.");
        return;
      }
      count++;
    }
  }
  favoriteCities = [...favoriteCities, currentCity];
  localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
  createOptions([currentCity]);
  alert(`${currentCity} is added to favorites!`);
}

function handleChangeCurrentWeather(e) {
  const chosenCity =
    e.target.value === "Favorites" ? "Vancouver" : e.target.value;
  fetchCurrentCity(chosenCity);
  forecastNextFiveDays(chosenCity);
}

starIcon.addEventListener("click", handleAddFavorite);
selected.addEventListener("change", handleChangeCurrentWeather);
