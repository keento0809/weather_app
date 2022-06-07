import CURRENT_WEATHER from './apikeys.js'

const submitBtn = document.querySelector(".submitValue")
const inputValue = document.getElementById('pac-input')
const cityName = document.querySelector('.cityName')
const description = document.querySelector('.description')
const temperature = document.querySelector('.temperature')
const weatherIcon = document.querySelector('.weatherIcon')


submitBtn.addEventListener('click', async function(){
  if(inputValue.value == ""){
    alert("Please insert a City name!")
    return 
  }
    const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=${CURRENT_WEATHER}&units=metric`
    );
    const data = await weather.json();

    document.getElementById("starIcon").style.display = "block"
    
    
    const nameValue = data['name'];
    cityName.innerHTML = nameValue;

    const temperatureValue = data.main.temp
    temperature.innerHTML = temperatureValue;

    const iconValue = data.weather[0].icon
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconValue}@2x.png">`

    const descriptionValue = data.weather[0].description
    description.innerHTML = descriptionValue

    console.log(data);


})

