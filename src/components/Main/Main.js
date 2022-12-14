import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

const Main = ({ temperature, clothingItems, handleCardClick }) => {
  const weatherType = () => {
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
      <WeatherCard temperature={temperature} />
      <div className="main__info">
        <p className="main__info-text">
          {" "}
          Today it is {temperature}°F / you may want to wear:{" "}
        </p>
      </div>
      <ul className="main__card-container">
        {clothingItems
          .filter((item) => item.weather === weatherType())
          .map((item) => (
            <ItemCard
              key={item._id}
              clothingItem={item}
              handleCardClick={handleCardClick}
            />
          ))}
        {console.log(clothingItems)}
      </ul>
    </main>
  );
};

export default Main;
