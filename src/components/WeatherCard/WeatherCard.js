import React, { useContext } from "react";
import "./WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const WeatherCard = ({ temperatureF, temperatureC }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temperature =
    currentTemperatureUnit === "F" ? temperatureF : temperatureC;

  return (
    <div className="weatherCard">
      <p className="weatherCard__temp">{`${temperature}°${currentTemperatureUnit}`}</p>
    </div>
  );
};

export default WeatherCard;
