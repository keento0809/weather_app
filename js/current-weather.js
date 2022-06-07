const submitBtn = document.querySelector(".submitValue")
const inputValue = document.getElementById('pac-input')
const cityName = document.querySelector('.cityName')
const description = document.querySelector('description')
const temperature = document.querySelector('temperature')


submitBtn.addEventListener('click', async function(){
    const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=02a1c175ec798f53253a8fd478e1c50c`
    );
    const data = await weather.json();
    
    const nameValue = data['name']
    cityName.innerHTML = nameValue

    console.log(data);

    if(inputValue.value == ""){
      alert("Please insert a City name!")
    }
})

