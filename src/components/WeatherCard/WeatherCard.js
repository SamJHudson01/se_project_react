import React from "react";
import "./WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const WeatherCard = ({ temperature }) => {
  return (
    <div className="weatherCard">
      <p className="weatherCard__temp">{`${temperature}°F`}</p>
    </div>
  );
};

export default WeatherCard;
