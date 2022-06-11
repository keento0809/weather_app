// // Get DOM
import CURRENT_WEATHER from "../apikeys.js";

const cityName = document.querySelector(".cityName");

export async function forecastFiveDaysAndAThreeGap(locationData, span) {
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
    forecastFiveDaysAndAThreeGap(cityName.innerHTML, this.id);
  }

  const nextFiveDays = document.querySelectorAll(".dayWeather");
  nextFiveDays.forEach((day) =>
    day.addEventListener("click", handleChangeDate)
  );

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
          )} ℃</span> / <span>${parseInt(data.main.temp_min).toFixed(
        1
      )} ℃</span>
          <div>
              <span>${parseInt(data.main.humidity).toFixed(1)} %</span>
          </div>
          </div>
        `;
    })
    .join("");
  threeHour.innerHTML = threeHourGapContent;
}
