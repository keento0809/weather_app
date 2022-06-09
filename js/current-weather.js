// // Get DOM
import { fetchCurrentCity } from "./currentCity.js";
import { forecastFiveDaysAndAThreeGap } from "./forecast.js";
import { createOptions } from "./createOption.js";

const submitBtn = document.querySelector(".submitValue");
const inputValue = document.getElementById("pac-input");
const cityName = document.querySelector(".cityName");
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

submitBtn.addEventListener("click", async function () {
  fetchCurrentCity(inputValue.value);

  const locationData = inputValue.value;
  forecastFiveDaysAndAThreeGap(locationData, 0);
});

window.addEventListener("DOMContentLoaded", () => {
  cityName.textContent = "Vancouver";
  currentCity = "Vancouver";
  document.getElementById("starIcon").style.display = "block";
  fetchCurrentCity(currentCity);
  forecastFiveDaysAndAThreeGap(currentCity, 0);

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

function handleTesting(e) {
  if (e.keyCode === 13) {
    const enteredCity = inputValue.value.split(",")[0];
    fetchCurrentCity(enteredCity);
    forecastFiveDaysAndAThreeGap(enteredCity, 0);
    inputValue.value = "";
  }
}

window.addEventListener("keyup", handleTesting);
starIcon.addEventListener("click", handleAddFavorite);
starIconFilled.addEventListener("click", handleRemoveFavorite);
