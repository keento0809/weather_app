import { fetchCurrentCity } from "./currentCity.js";
import { forecastFiveDaysAndAThreeGap } from "./forecast.js";

const inputValue = document.getElementById("pac-input");

export function handleTesting(e) {
  if (e.keyCode === 13) {
    const enteredCity = inputValue.value.split(",")[0];
    fetchCurrentCity(enteredCity);
    forecastFiveDaysAndAThreeGap(enteredCity, 0);
    inputValue.value = "";
  }
}
