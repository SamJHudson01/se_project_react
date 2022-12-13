import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({ temperature }) => {
  return (
    <div className="weatherCard">
      <p className="weatherCard__temp">{`${temperature}°F`}</p>
    </div>
  );
};

export default WeatherCard;
