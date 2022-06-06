async function weatherApi() {
  const weather = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=49.2846717&lon=-123.1200546&appid=02a1c175ec798f53253a8fd478e1c50c"
  );
  const data = await weather.json();
  console.log(data);
}

weatherApi();
