import CURRENT_WEATHER from './apikeys.js'

const submitBtn = document.querySelector(".submitValue")
const inputValue = document.getElementById('pac-input')
const cityName = document.querySelector('.cityName')
const description = document.querySelector('description')
const temperature = document.querySelector('temperature')


submitBtn.addEventListener('click', async function(e){
  if(inputValue.value == ""){
    alert("Please insert a City name!")
    return 
  }

  console.log(e.keyCode)
    const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=${CURRENT_WEATHER}`
    );
    const data = await weather.json();
    
    const nameValue = data['name']
    cityName.innerHTML = nameValue

    const temperatureValue = data['wheather']

    console.log(data);

})

