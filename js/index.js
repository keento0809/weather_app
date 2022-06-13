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

export function checkIfFavorite(val) {
  const citiesFromLocalStorage = localStorage.getItem("favoriteCities");
  favoriteCities = citiesFromLocalStorage
    ? JSON.parse(citiesFromLocalStorage)
    : [];
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
  forecastFiveDaysAndAThreeGap(locationData, "");
});

window.addEventListener("DOMContentLoaded", () => {
  cityName.textContent = "Vancouver";
  currentCity = "Vancouver";
  document.getElementById("starIcon").style.display = "block";
  fetchCurrentCity(currentCity);
  forecastFiveDaysAndAThreeGap(currentCity, "");

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
  currentCity = cityName.innerHTML;
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
  console.log(typeof updatedFavoriteCities);
  localStorage.setItem("favoriteCities", JSON.stringify(updatedFavoriteCities));
  selected.innerHTML = `<option value="Favorites">Favorites</option>`;
  if (updatedFavoriteCities.length > 0) {
    createOptions(updatedFavoriteCities);
  }
  checkIfFavorite(removingCity);
  alert(`${removingCity} has removed from favorites!`);
}

starIcon.addEventListener("click", handleAddFavorite);
starIconFilled.addEventListener("click", handleRemoveFavorite);
