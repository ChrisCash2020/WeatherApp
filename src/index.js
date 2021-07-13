import mainStyles from './style.css';
let AllDates = document.querySelectorAll('.date');
let datehtml = document.querySelector('.todays-date');
var d = new Date();
let tracker = d.getDay();
let todaysDate = d.toDateString();
datehtml.textContent = `${todaysDate.slice(
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
  return (temp - 273.15) * (9 / 5) + 32;
};
AllDates.forEach((date) => {
  tracker++;
  date.textContent = `${weekday[tracker]}`;
});

const AllTemps = document.querySelector('.temp');

async function getCoords() {
  const response = await fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=celina&APPID=2956f1f443ea71e7c2f75fc5924b8aff',
    { mode: 'cors' }
  );
  const coorData = await response.json();
  let lat = coorData.coord.lat;
  let lon = coorData.coord.lon;
  getStuff(lat, lon);
}
getCoords();

// async function getStuff(lat, lon) {
//   const response = await fetch(
//     `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=2956f1f443ea71e7c2f75fc5924b8aff`,
//     { mode: 'cors' }
//   );
//   const tempData = await response.json();
//   console.log(tempData);
// }
class Weather {
  constructor(lat, lon) {
    (this.lat = lat), (this.lon = lon);
  }
  async getData(lat, lon) {
    const response = await fetch(
      `https://https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=2956f1f443ea71e7c2f75fc5924b8aff`,
      { mode: 'cors' }
    );
    const tempData = await response.json();
    console.log(tempData);
  }
}
let celina = new Weather('Celina');
