import "././Vendor/normalize.css";
import "./App.css";
import Header from "./Components/Header/Header";
import WeatherCard from "./Components/WeatherCard/WeatherCard";
import { getWeatherData, filterWeatherType } from "./Utils/weatherAPI";
import { longitude, latitude, APIkey } from "./Utils/constants";
import { useEffect, useState } from "react";

function App() {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const weatherData = getWeatherData(latitude, longitude, APIkey);
    weatherData.then((data) => {
      const weatherType = filterWeatherType(data);
      const cityName = data.name;
      const temperature = Math.round(data.main.temp);
      setWeatherData({ temperature, weatherType, cityName });
    });
  }, []);

  return (
    <>
      <div className="app">
        <div className="app__content">
          <Header weatherData={weatherData.cityName} />
          {console.log(weatherData)}
          <WeatherCard temperature={weatherData.temperature} />
        </div>
      </div>
    </>
  );
}

export default App;
