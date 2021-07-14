import mainStyles from './style.css';
let AllDates = document.querySelectorAll('.date');
let dateHtml = document.querySelector('.todays-date');
let currentTempHtml = document.getElementById('current-temp');
let feelsLikeHtml = document.getElementById('feels-like');
let humidHtml = document.getElementById('humid');
let windHtml = document.getElementById('wind');
let cityHtml = document.querySelector('.city');
let weatherDescHtml = document.querySelector('.weather-desc');
let fBtn = document.querySelector('.f-btn');
let cBtn = document.querySelector('.c-btn');
let allTemp = document.querySelectorAll('.temp');
let form = document.querySelector('form');
let searchBtn = document.querySelector('#search-btn');
let searchDiv = document.querySelector('.search-div');
let searchIcon = document.querySelector('.icon');
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
let currentTempMaker = (temp, feelTemp, sign) => {
  currentTempHtml.style.letterSpacing = '-1px';
  currentTempHtml.textContent = `${temp} ${sign}`;
  feelsLikeHtml.textContent = `${feelTemp} ${sign}`;
};
let weekTempMaker = (element, temp, sign) => {
  element.textContent = `${temp} ${sign}`;
};
let startWeatherApp = (city) => {
  async function getCoords() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=2956f1f443ea71e7c2f75fc5924b8aff`,
      { mode: 'cors' }
    );
    const coorData = await response.json();
    if (coorData.cod === '404') {
      console.log('eerrror');
      searchDiv.classList.add('invalid');
    } else {
      console.log(searchDiv);
      searchDiv.classList.remove('invalid');
      let lat = coorData.coord.lat;
      let lon = coorData.coord.lon;
      cityHtml.textContent = `${coorData.name}, ${coorData.sys.country}`;
      weatherDescHtml.textContent = `${coorData.weather[0].description}`;
      getStuff(lat, lon);
    }
  }
  getCoords();
  async function getStuff(lat, lon) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=2956f1f443ea71e7c2f75fc5924b8aff`,
      { mode: 'cors' }
    );
    const tempData = await response.json();
    let fTemp = farenheitt(tempData.current.temp);
    let cTemp = celcius(tempData.current.temp);
    let feelFTemp = farenheitt(tempData.current.feels_like);
    let feelCTemp = celcius(tempData.current.feels_like);
    let fSign = '°F';
    let cSign = '°C';
    currentTempMaker(fTemp, feelFTemp, fSign);
    currentTempMaker(fTemp, feelFTemp, fSign);
    humidHtml.textContent = `${tempData.current.humidity}%`;
    windHtml.textContent = `${tempData.current.wind_speed} mph`;
    for (let i = 1; i < tempData.daily.length; i++) {
      let tempF = farenheitt(tempData.daily[i].temp.day);
      weekTempMaker(allTemp[i - 1], tempF, fSign);
    }
    fBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentTempMaker(fTemp, feelFTemp, fSign);
      for (let i = 1; i < tempData.daily.length; i++) {
        let tempF = farenheitt(tempData.daily[i].temp.day);
        weekTempMaker(allTemp[i - 1], tempF, fSign);
      }
    });
    cBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentTempMaker(cTemp, feelCTemp, cSign);
      for (let i = 1; i < tempData.daily.length; i++) {
        let tempC = celcius(tempData.daily[i].temp.day);
        weekTempMaker(allTemp[i - 1], tempC, cSign);
      }
    });
  }
};
startWeatherApp('celina');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  startWeatherApp(searchBtn.value);
  searchBtn.value = '';
});
searchIcon.addEventListener('click', (e) => {
  e.preventDefault();
  startWeatherApp(searchBtn.value);
  searchBtn.value = '';
});
