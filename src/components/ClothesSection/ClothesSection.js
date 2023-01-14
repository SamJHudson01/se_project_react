import React from "react";
import "./ClothesSection.css";
import ItemCard from "./ItemCard/ItemCard";

const ClothesSection = ({ clothingItems }) => {
  return (
    <div className="clothes-section">
      {clothingItems.map((item) => (
        <ItemCard
          key={item.id}
          image={item.image}
          name={item.name}
          weatherType={item.weatherType}
        />
      ))}
    </div>
  );
};

export default ClothesSection;
