export function getWeatherData(latitude, longitude, APIkey) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => res.json());
}

export function filterWeatherType(weatherData) {
  var weatherType = null;
  if (weatherData.main.temp > 70) {
    weatherType = "hot";
  } else if (weatherData.main.temp > 50) {
    weatherType = "warm";
  } else {
    weatherType = "cold";
  }

  return weatherType;
}
