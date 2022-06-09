// // Get DOM
import CURRENT_WEATHER from "../apikeys.js";

const submitBtn = document.querySelector(".submitValue");
const inputValue = document.getElementById("pac-input");
const cityName = document.querySelector(".cityName");
const description = document.querySelector(".description");
const temperature = document.querySelector(".temperature");
const weatherIcon = document.querySelector(".weatherIcon");

const selected = document.querySelector("#favorites");

const starIconFilled = document.querySelector("#starIconFilled");

let currentCity = "";
let favoriteCities = [];

function checkIfFavorite(val) {
  const citiesFromLocalStorage = localStorage.getItem("favoriteCities");
  favoriteCities = citiesFromLocalStorage
    ? JSON.parse(citiesFromLocalStorage)
    : [];
  console.log(favoriteCities);
  document.getElementById("starIconFilled").style.display = "none";
  document.getElementById("starIcon").style.display = "block";

  if (favoriteCities.length > 0) {
    for (let i = 0; i < favoriteCities.length; i++) {
      if (favoriteCities[i] == val) {
        document.getElementById("starIconFilled").style.display = "block";
        document.getElementById("starIcon").style.display = "none";
      }
    }
  }
}

async function fetchCurrentCity(val) {
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

submitBtn.addEventListener("click", async function () {
  fetchCurrentCity(inputValue.value);

  const locationData = inputValue.value;
  forecastNextFiveDays(locationData, 0);
});

// // test
async function forecastNextFiveDays(locationData, span) {
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
  console.log(data);

  const dataForNextFiveDays = [];
  const dataForThreeHourGap = [];

  for (let i = 0; i < data.list.length; i += 8) {
    dataForNextFiveDays.push(data.list[i]);
  }
  console.log(Number(span) + Number(span * 7));
  const num = Number(span) + Number(span * 7);
  const area = 8 + (Number(span * 7) + Number(span));
  for (let i = num; i < area; i++) {
    dataForThreeHourGap.push(data.list[i]);
  }

  const fiveDaysContent = dataForNextFiveDays
    .map((day, index) => {
      return `
        <div class="wheather dayWeather" key=${index} id=${index}>
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

  function handleChangeDate() {
    console.log(cityName.innerHTML);
    console.log(this.id);
    forecastNextFiveDays(cityName.innerHTML, this.id);
  }

  const nextFiveDays = document.querySelectorAll(".dayWeather");
  nextFiveDays.forEach((day) =>
    day.addEventListener("click", handleChangeDate)
  );
  // console.log(nextFiveDays);

  const threeHourGapContent = dataForThreeHourGap
    .map((data, index) => {
      return `
        <div class="wheather3h" key=${index}>
        <img src="http://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png" />
        <p>${data.dt_txt.split(" ")[1].slice(0, 5)}</p>
        <p>${parseInt(data.main.temp).toFixed(1)} ℃</p>
        <span>${parseInt(data.main.temp_max).toFixed(
          1
        )} ℃</span> / <span>${parseInt(data.main.temp_min).toFixed(1)} ℃</span>
        <div>
            <span>${parseInt(data.main.humidity).toFixed(1)} %</span>
        </div>
        </div>
      `;
    })
    .join("");
  threeHour.innerHTML = threeHourGapContent;
}
forecastNextFiveDays("", 0);

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
  fetchCurrentCity(currentCity);

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
  checkIfFavorite(currentCity);
  alert(`${currentCity} is added to favorites!`);
}

function handleChangeCurrentWeather(e) {
  const chosenCity =
    e.target.value === "Favorites" ? "Vancouver" : e.target.value;
  fetchCurrentCity(chosenCity);
  forecastNextFiveDays(chosenCity, 0);
}

starIcon.addEventListener("click", handleAddFavorite);
selected.addEventListener("change", handleChangeCurrentWeather);

function handleTesting(e) {
  if (e.keyCode === 13) {
    const enteredCity = inputValue.value.split(",")[0];
    fetchCurrentCity(enteredCity);
    forecastNextFiveDays(enteredCity, 0);
    inputValue.value = "";
  }
}

function handleRemoveFavorite() {
  const removingCity = cityName.innerHTML;
  const updatedFavoriteCities = favoriteCities.filter(
    (city) => city !== removingCity
  );
  console.log(updatedFavoriteCities);
  localStorage.setItem("favoriteCities", JSON.stringify(updatedFavoriteCities));
  selected.innerHTML = `<option value="Favorites">Favorites</option>`;
  if (updatedFavoriteCities.length > 0) {
    createOptions(updatedFavoriteCities);
  }
  checkIfFavorite(removingCity);
  alert(`${removingCity} has removed from favorites!`);
}

window.addEventListener("keyup", handleTesting);
starIconFilled.addEventListener("click", handleRemoveFavorite);
