import mainStyles from './style.css';
let AllDates = document.querySelectorAll('.date');
let dateHtml = document.querySelector('.todays-date');
let currentTempHtml = document.getElementById('current-temp');
let feelsLikeHtml = document.getElementById('feels-like');
let humidHtml = document.getElementById('humid');
let windHtml = document.getElementById('wind');
let cityHtml = document.querySelector('.city');
let weatherDescHtml = document.querySelector('.weather-desc');
var d = new Date();
let tracker = d.getDay();
let todaysDate = d.toDateString();
dateHtml.textContent = `${todaysDate.slice(
  0,
  todaysDate.length - 4
)}${d.toLocaleString('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
})}`;
var weekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
let farenheitt = (temp) => {
  return Math.round((temp - 273.15) * (9 / 5) + 32);
};
let celcius = (temp) => {
  return Math.round(temp - 273.15);
};
AllDates.forEach((date) => {
  tracker++;
  date.textContent = `${weekday[tracker]}`;
});

const AllTemps = document.querySelector('.temp');

// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     x.innerHTML = 'Geolocation is not supported by this browser.';
//   }
// }

// function showPosition(position) {

//   );
// }

let startWeatherApp = () => {
  async function getCoords() {
    const response = await fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=celina&APPID=2956f1f443ea71e7c2f75fc5924b8aff',
      { mode: 'cors' }
    );
    const coorData = await response.json();
    console.log(coorData);
    let lat = coorData.coord.lat;
    let lon = coorData.coord.lon;
    cityHtml.textContent = `${coorData.name}, ${coorData.sys.country}`;
    weatherDescHtml.textContent = `${coorData.weather[0].description}`;
    getStuff(lat, lon);
  }
  getCoords();

  async function getStuff(lat, lon) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=2956f1f443ea71e7c2f75fc5924b8aff`,
      { mode: 'cors' }
    );
    const tempData = await response.json();
    console.log(tempData);
    let fTemp = farenheitt(tempData.current.temp);
    let cTemp = celcius(tempData.current.temp);
    let feelFTemp = farenheitt(tempData.current.feels_like);
    let feelCTemp = celcius(tempData.current.feels_like);
    let fSign = '°F';
    let cSignt = '°C';
    currentTempHtml.style.letterSpacing = '-1px';
    currentTempHtml.textContent = `${fTemp} ${fSign}`;
    feelsLikeHtml.textContent = `${feelFTemp} ${fSign}`;
    humidHtml.textContent = `${tempData.current.humidity}%`;
    windHtml.textContent = `${tempData.current.wind_speed} mph`;
    for (var i = 0; i < tempData.daily.length; i += 8) {
      console.log(tempData.daily[i].dt_txt);
    }
  }
};
startWeatherApp();
