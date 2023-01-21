import React from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

const ClothesSection = ({ clothingItems, handleCardClick, handleAddItem }) => {
  const items = Array.isArray(clothingItems)
    ? clothingItems
    : Array.from(clothingItems);

  return (
    <div className="clothes-section">
      <div className="clothes-section__text-container">
        <p className="clothes-section__title">Your items</p>
        <button className="clothes-section__add-button" onClick={handleAddItem}>
          + Add new
        </button>
      </div>
      <div className="clothes-section__grid">
        {items.map((item) => (
          <ItemCard
            key={item._id}
            clothingItem={item}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ClothesSection;
