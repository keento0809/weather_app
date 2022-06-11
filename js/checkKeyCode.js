import { fetchCurrentCity } from "./currentCity.js";
import { forecastFiveDaysAndAThreeGap } from "./forecast.js";

const inputValue = document.getElementById("pac-input");

export function handleTesting(e) {
  if (e.keyCode === 13) {
    let enteredCity = inputValue.value.split(",")[0];
    console.log(inputValue.value.split(" ")[0]);
    // console.log(
    //   enteredCity.substring(enteredCity.length - 3, enteredCity.length),
    //   enteredCity
    //     .substring(enteredCity.length - 3, enteredCity.length)
    //     .toUpperCase(),
    //   enteredCity.substring(enteredCity.length - 3, enteredCity.length) ===
    //     enteredCity
    //       .substring(enteredCity.length - 3, enteredCity.length)
    //       .toUpperCase()
    // );
    if (
      enteredCity.substring(enteredCity.length - 3, enteredCity.length) ===
      enteredCity
        .substring(enteredCity.length - 3, enteredCity.length)
        .toUpperCase()
    )
      enteredCity = enteredCity.substring(0, enteredCity.length - 3);
    fetchCurrentCity(enteredCity);
    forecastFiveDaysAndAThreeGap(enteredCity, 0);
    inputValue.value = "";
  }
}
