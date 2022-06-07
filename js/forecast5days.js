const WEATHER_API_KEY = config.apiKeyForForecastNextFiveDays;

const fiveDays = document.querySelector("#fiveDays");
const threeHour = document.querySelector("#threeHour");

async function forecastNextFiveDays() {
  const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=${WEATHER_API_KEY}&units=metric`
  );
  const data = await weather.json();
  console.log(data.list);

  const dataForNextFiveDays = [];
  const dataForThreeHourGap = [];

  for (let i = 0; i < data.list.length; i += 8) {
    dataForNextFiveDays.push(data.list[i]);
  }
  console.log(dataForNextFiveDays[0].dt_txt.split(" ")[0].split("/"));

  for (let i = 0; i < 8; i++) {
    dataForThreeHourGap.push(data.list[i]);
  }
  console.log(dataForThreeHourGap);

  // <p>${day.weather[0].description}</p>

  const fiveDaysContent = dataForNextFiveDays
    .map((day, index) => {
      return `
        <div key=${index} style="padding:1rem;">
            <p>Data: ${day.dt_txt.split(" ")[0].replace(/-/g, "/").slice(5)}</p>
            <p>Temp: ${parseInt(day.main.temp).toFixed(1)} ℃</p>
            High: <span>${parseInt(day.main.temp_max).toFixed(
              1
            )} ℃</span> / Low: <span>${parseInt(day.main.temp_min).toFixed(
        1
      )} ℃</span>
            <div>
                <span>Humid: ${parseInt(day.main.humidity).toFixed(1)} %</span>
            </div>
            <img src="http://openweathermap.org/img/wn/${
              day.weather[0].icon
            }@2x.png" />
        </div>
      `;
    })
    .join("");
  fiveDays.innerHTML = fiveDaysContent;

  // <p>${data.dt_txt}</p>
  //   <p>${data.weather[0].description}</p>
  //   <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />

  const threeHourGapContent = dataForThreeHourGap
    .map((data, index) => {
      return `
        <div key=${index} style="padding:1rem;">
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
        <img src="http://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png" />
        </div>
      `;
    })
    .join("");
  threeHour.innerHTML = threeHourGapContent;
}
forecastNextFiveDays();
