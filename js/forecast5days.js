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

  const fiveDaysContent = dataForNextFiveDays
    .map((day, index) => {
      return `
        <div key=${index} style="padding:1rem;">
            <p>${day.dt_txt.split(" ")[0]}</p>
            <p>${day.weather[0].description}</p>
            <img src="http://openweathermap.org/img/wn/${
              day.weather[0].icon
            }@2x.png" />
        </div>
      `;
    })
    .join("");
  fiveDays.innerHTML = fiveDaysContent;

  const threeHourGapContent = dataForThreeHourGap
    .map((data, index) => {
      return `
        <div key=${index} style="padding:1rem;">
            <p>${data.dt_txt}</p>
            <p>${data.weather[0].description}</p>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
        </div>
      `;
    })
    .join("");
  threeHour.innerHTML = threeHourGapContent;
}
forecastNextFiveDays();
