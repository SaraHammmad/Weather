const findLocation = document.getElementById('findLocation');

findLocation.addEventListener('input', function(e) {
    console.log(e.target.value);
    getDataApi(e.target.value);
});

// Fetch data from API
async function getDataApi(cityName) {
    if (cityName.length > 2) {
        let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${cityName}&days=3&key=ce0c492db8b142c6b8c163707240912`);
        let data = await res.json();
        console.log(data);
        displayData(data);
    }
}

// Display weather data
function displayData(data) {
    /////////////////////////////////// Today's weather ///////////////////////////////////
    let dateToday = new Date(data.current.last_updated);
    document.getElementById('todayName').innerHTML = dateToday.toLocaleString('en-us', { weekday: 'long' });
    document.getElementById('todayDate').innerHTML = dateToday.getDate() + ' ' + dateToday.toLocaleString('en-us', { month: 'long' });
    document.getElementById('location').innerHTML = data.location.name;
    document.getElementById('todayTemp').innerHTML = data.current.temp_c + "°C";
    document.getElementById('todayIcon').setAttribute('src', `https:${data.current.condition.icon}`);
    document.getElementById('todayCondition').innerHTML = data.current.condition.text;
    document.getElementById('humidity').innerHTML = data.current.humidity + '%';
    document.getElementById('wind-speed').innerHTML = data.current.wind_kph + ' km/h';
    document.getElementById('wind-dir').innerHTML = data.current.wind_dir;

    ///////////////////////////// Next 2 days forecast ///////////////////////////////////
    let cartoona = "";
    for (let i = 1; i <= 2; i++) {
        let dateNext = new Date(data.forecast.forecastday[i].date);
        cartoona = `<div class="forecast-card p-4 rounded-3 ${i == 1 ? 'bg-custom-two' : 'bg-custom'} text-white text-center h-100">
                      <div class="day">${dateNext.toLocaleString('en-us', { weekday: 'long' })}</div>
                      <img src="https:${data.forecast.forecastday[i].day.condition.icon}" alt="" width="90">
                      <div class="fs-1">${data.forecast.forecastday[i].day.maxtemp_c}<sup>°C</sup></div>
                      <div class="fs-1">${data.forecast.forecastday[i].day.mintemp_c}<sup>°C</sup></div>
                      <div class="text-primary">${data.forecast.forecastday[i].day.condition.text}</div>
                    </div>`;
        document.querySelectorAll('.card-days')[i - 1].innerHTML = cartoona;
    }
}/////////////////////////////geolocation///////////////////////////////////////////////////////////////////

if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function(pos){
    console.log(pos)
    let lat = pos.coords.latitude;
    let lon = pos.coords.longitude;
    getDataApi(`${lat},${lon}`)
  })
}
////////////////////////////////////////////////////////////////
const links = document.querySelectorAll('.nav-link');
console.log(links)

for(let i = 0;i<links.length;i++){
  links[i].addEventListener('click',function(e){
    e.preventDefault()
    links.forEach(function(link){
      link.classList.remove('active')
    })
    links[i].classList.add('active');
    
  })
}
