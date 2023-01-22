import React, { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { ClothingItemsContext } from "../../contexts/ClothingItemsContext";

const Main = ({ temperatureF, temperatureC, handleCardClick }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const { clothingItems } = useContext(ClothingItemsContext);

  const weatherType = () => {
    const temperature = temperatureF;

    if (temperature >= 86) {
      return "hot";
    } else if (temperature >= 66) {
      return "warm";
    } else {
      return "cold";
    }
  };

  return (
    <main className="main">
      <WeatherCard
        temperatureF={temperatureF}
        temperatureC={temperatureC}
        currentTemperatureUnit={currentTemperatureUnit}
      />
      <div className="main__info">
        <p className="main__info-text">
          {" "}
          Today it is{" "}
          {currentTemperatureUnit === "F" ? temperatureF : temperatureC}°
          {currentTemperatureUnit} / you may want to wear:{" "}
        </p>
      </div>
      <ul className="main__card-container">
        {clothingItems
          .filter((item) => item.weather === weatherType())
          .map((item) => (
            <ItemCard
              key={item.id}
              clothingItem={item}
              handleCardClick={handleCardClick}
            />
          ))}
      </ul>
    </main>
  );
};

export default Main;
