import React from "react";
import "./ItemCard.css";

const ItemCard = ({ clothingItem, handleCardClick }) => {
  return (
    <>
      <div
        className="itemCard"
        onClick={() => handleCardClick(clothingItem)}
        style={{
          backgroundImage: `url(${clothingItem.link})`,
        }}
      >
        <div className="itemCard__title-container">
          <p className="itemCard__title">{clothingItem.name}</p>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
